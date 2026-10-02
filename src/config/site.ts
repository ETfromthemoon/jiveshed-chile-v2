// Datos de contacto y helpers de enlaces — única fuente de verdad.
// Cambiar aquí el correo o el número actualiza todo el sitio.

export const CONTACT_EMAIL = 'hello@jiveshed.com';

/** Número en formato internacional sin '+' ni espacios (requerido por wa.me). */
export const WHATSAPP_NUMBER = '56936106328';
export const WHATSAPP_DISPLAY = '+56 9 3610 6328';

/** Enlace a WhatsApp con un mensaje opcional precargado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Enlace mailto con asunto (y cuerpo) opcionales, correctamente codificados. */
export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
}
