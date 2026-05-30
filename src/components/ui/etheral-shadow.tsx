'use client';

import React, { useRef, useId, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { animate, useMotionValue } from 'framer-motion';
import type { AnimationPlaybackControls } from 'framer-motion';

interface AnimationConfig {
    scale: number;   // 1-100
    speed: number;   // 1-100
}

interface NoiseConfig {
    opacity: number; // 0-1
    scale: number;   // ~1-2
}

interface EtherealShadowProps {
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
    if (fromLow === fromHigh) return toLow;
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    return `shadowoverlay-${id.replace(/:/g, '')}`;
};

export function EtherealShadow({
    sizing = 'fill',
    color = 'rgba(128, 128, 128, 1)',
    animation,
    noise,
    style,
    className,
}: EtherealShadowProps) {
    const id = useInstanceId();

    // Respect the user's reduced-motion preference: keep the static
    // ethereal mask visible but stop the looping hue/displacement animation.
    const [reduceMotion, setReduceMotion] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const animationEnabled = !!animation && animation.scale > 0 && !reduceMotion;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                ease: 'linear',
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute('values', String(value));
                    }
                },
            });
            return () => {
                if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
            };
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue]);

    return (
        <div
            className={className}
            style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%',
                ...style,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: -displacementScale,
                    filter: animationEnabled ? `url(#${id}) blur(4px)` : 'none',
                }}
            >
                {animationEnabled && (
                    <svg style={{ position: 'absolute' }}>
                        <defs>
                            <filter id={id}>
                                <feTurbulence
                                    result="undulation"
                                    numOctaves="2"
                                    baseFrequency={`${mapRange(animation!.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation!.scale, 0, 100, 0.004, 0.002)}`}
                                    seed="0"
                                    type="turbulence"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={displacementScale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                <div
                    style={{
                        backgroundColor: color,
                        maskImage: `url('/textures/ethereal-mask.png')`,
                        WebkitMaskImage: `url('/textures/ethereal-mask.png')`,
                        maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                        WebkitMaskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("/textures/ethereal-noise.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: 'repeat',
                        opacity: noise.opacity / 2,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
}
