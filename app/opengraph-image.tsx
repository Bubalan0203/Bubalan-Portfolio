import { ImageResponse } from 'next/og';

export const alt = 'Bubalan S — Associate Product Engineer at Predigle';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Link preview card for LinkedIn, WhatsApp and X. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'radial-gradient(70% 80% at 85% 10%, #0b3a52 0%, #02060B 60%)', color: '#E8F4FA', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, color: '#4CD8FF' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, border: '2px solid #4CD8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 700 }}>B</div>
          Associate Product Engineer @ Predigle
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4 }}>Bubalan S.</div>
          <div style={{ fontSize: 40, color: '#9FB3C2', marginTop: 8 }}>Healthcare products, end to end: role-based flows, document extraction, HIPAA.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#7E909D' }}>Coimbatore, IN · Open to projects · bubalan28@gmail.com</div>
      </div>
    ),
    size,
  );
}
