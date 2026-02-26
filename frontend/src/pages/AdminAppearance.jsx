import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminAppearance() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [pdfSettings, setPdfSettings] = useState({
    backgroundImageUrl: '/certificate-bg.png',
    backgroundOpacity: 0.38,
    gradientOpacity: 0.45,
    veilOpacity: 0.04,
    gradientEnabled: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const profile = await api.get('/profile/get');
        setRole(profile.data?.role || '');
        const res = await api.get('/settings/pdf-defaults');
        setPdfSettings((prev) => ({ ...prev, ...(res.data || {}) }));
      } catch (e) {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const applyPreset = (type) => {
    const presets = {
      Vibrant: { backgroundOpacity: 0.45, gradientOpacity: 0.55, veilOpacity: 0.03, gradientEnabled: true },
      Soft: { backgroundOpacity: 0.32, gradientOpacity: 0.35, veilOpacity: 0.05, gradientEnabled: true },
      Minimal: { backgroundOpacity: 0.28, gradientOpacity: 0.0, veilOpacity: 0.06, gradientEnabled: false },
    };
    const preset = presets[type];
    if (preset) setPdfSettings((s) => ({ ...s, ...preset }));
  };

  const saveOrgDefaults = async () => {
    try {
      const payload = {
        backgroundImageUrl: pdfSettings.backgroundImageUrl,
        backgroundOpacity: pdfSettings.backgroundOpacity,
        gradientOpacity: pdfSettings.gradientOpacity,
        veilOpacity: pdfSettings.veilOpacity,
        gradientEnabled: pdfSettings.gradientEnabled,
      };
      await api.post('/settings/pdf-defaults', payload);
      toast.success('Organization defaults saved');
    } catch (e) {
      toast.error('Failed to save org defaults');
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#94a3b8', padding: 24 }}>Loading...</div>;
  }

  if (role !== 'university') {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#ef4444', padding: 24 }}>Forbidden: University role required.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <DashboardLayout>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
          <h1 style={{ color: '#3b82f6', textAlign: 'center', marginBottom: 16 }}>Admin: PDF Appearance</h1>

          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            borderRadius: 16,
            padding: 16,
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <button onClick={() => applyPreset('Vibrant')} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.15)', color: '#e2e8f0', cursor: 'pointer' }}>Vibrant</button>
              <button onClick={() => applyPreset('Soft')} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(148,163,184,0.3)', background: 'rgba(148,163,184,0.15)', color: '#e2e8f0', cursor: 'pointer' }}>Soft</button>
              <button onClick={() => applyPreset('Minimal')} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.4)', color: '#e2e8f0', cursor: 'pointer' }}>Minimal</button>
              <button onClick={saveOrgDefaults} style={{ marginLeft: 'auto', padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.15)', color: '#bbf7d0', cursor: 'pointer', fontWeight: 700 }}>Save as Org Default</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ color: '#cbd5e1', fontSize: 14 }}>Background Image</label>
                <select
                  value={pdfSettings.backgroundImageUrl}
                  onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundImageUrl: e.target.value }))}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(148,163,184,0.3)', marginTop: 6 }}
                >
                  <option value="/certificate-bg.png">Colorful Waves (default)</option>
                  <option value="/background.png">Abstract Pattern</option>
                  <option value="/custom">Custom URL...</option>
                </select>
                {pdfSettings.backgroundImageUrl === '/custom' && (
                  <input
                    placeholder="Paste custom image URL"
                    value={pdfSettings.customBackgroundUrl || ''}
                    onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundImageUrl: e.target.value || '/custom' }))}
                    style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid rgba(148,163,184,0.3)', marginTop: 8 }}
                  />
                )}
              </div>

              <div>
                <label style={{ color: '#cbd5e1', fontSize: 14 }}>Background Opacity ({Math.round(pdfSettings.backgroundOpacity * 100)}%)</label>
                <input type="range" min="0" max="1" step="0.01" value={pdfSettings.backgroundOpacity}
                  onChange={(e) => setPdfSettings((s) => ({ ...s, backgroundOpacity: Number(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ color: '#cbd5e1', fontSize: 14 }}>Gradient Opacity ({Math.round(pdfSettings.gradientOpacity * 100)}%)</label>
                <input type="range" min="0" max="1" step="0.01" value={pdfSettings.gradientOpacity}
                  onChange={(e) => setPdfSettings((s) => ({ ...s, gradientOpacity: Number(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ color: '#cbd5e1', fontSize: 14 }}>White Veil Opacity ({Math.round(pdfSettings.veilOpacity * 100)}%)</label>
                <input type="range" min="0" max="0.3" step="0.01" value={pdfSettings.veilOpacity}
                  onChange={(e) => setPdfSettings((s) => ({ ...s, veilOpacity: Number(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ color: '#cbd5e1', fontSize: 14, display: 'block', marginBottom: 6 }}>Enable Color Gradient Overlay</label>
                <input type="checkbox" checked={pdfSettings.gradientEnabled}
                  onChange={(e) => setPdfSettings((s) => ({ ...s, gradientEnabled: e.target.checked }))}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
