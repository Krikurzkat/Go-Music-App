import { useState } from 'react';
import { RiArrowLeftLine, RiUserLine, RiVolumeUpLine, RiEqualizerLine, RiShieldLine, RiNotification3Line, RiGlobalLine, RiHardDriveLine, RiComputerLine, RiApps2Line, RiLogoutBoxLine, RiCheckLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

interface SettingSection {
  title: string;
  icon: React.ElementType;
  items: { label: string; type: 'toggle' | 'select' | 'action'; value?: string | boolean; options?: string[] }[];
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  const [settings, setSettings] = useState({
    audioQuality: 'Very High',
    crossfade: '6s',
    autoplay: true,
    explicitFilter: false,
    privateSession: false,
    showActivity: true,
    notifications: true,
    newReleaseAlerts: true,
    podcastAlerts: true,
    language: 'English',
    dataSaver: false,
    normalization: true,
    gapless: true,
  });

  const sections: SettingSection[] = [
    {
      title: 'Account',
      icon: RiUserLine,
      items: [
        { label: 'Email', type: 'action', value: 'user@gomusic.com' },
        { label: 'Subscription', type: 'action', value: 'Premium Individual' },
        { label: 'Change password', type: 'action' },
      ],
    },
    {
      title: 'Audio Quality',
      icon: RiVolumeUpLine,
      items: [
        { label: 'Streaming quality', type: 'select', value: settings.audioQuality, options: ['Low', 'Normal', 'High', 'Very High', 'Lossless'] },
        { label: 'Download quality', type: 'select', value: 'Very High', options: ['Low', 'Normal', 'High', 'Very High'] },
        { label: 'Audio normalization', type: 'toggle', value: settings.normalization },
        { label: 'Gapless playback', type: 'toggle', value: settings.gapless },
      ],
    },
    {
      title: 'Equalizer',
      icon: RiEqualizerLine,
      items: [
        { label: 'Crossfade', type: 'select', value: settings.crossfade, options: ['Off', '2s', '4s', '6s', '8s', '10s', '12s'] },
        { label: 'Autoplay', type: 'toggle', value: settings.autoplay },
      ],
    },
    {
      title: 'Privacy & Social',
      icon: RiShieldLine,
      items: [
        { label: 'Private session', type: 'toggle', value: settings.privateSession },
        { label: 'Show listening activity', type: 'toggle', value: settings.showActivity },
        { label: 'Explicit content filter', type: 'toggle', value: settings.explicitFilter },
      ],
    },
    {
      title: 'Notifications',
      icon: RiNotification3Line,
      items: [
        { label: 'Push notifications', type: 'toggle', value: settings.notifications },
        { label: 'New release alerts', type: 'toggle', value: settings.newReleaseAlerts },
        { label: 'Podcast episode alerts', type: 'toggle', value: settings.podcastAlerts },
      ],
    },
    {
      title: 'Language & Region',
      icon: RiGlobalLine,
      items: [
        { label: 'Language', type: 'select', value: settings.language, options: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Filipino'] },
      ],
    },
    {
      title: 'Storage',
      icon: RiHardDriveLine,
      items: [
        { label: 'Offline downloads', type: 'action', value: '2.4 GB used' },
        { label: 'Data saver', type: 'toggle', value: settings.dataSaver },
        { label: 'Clear cache', type: 'action' },
      ],
    },
    {
      title: 'Connected Devices',
      icon: RiComputerLine,
      items: [
        { label: 'This device', type: 'action', value: 'Web Browser · Active' },
        { label: 'Manage devices', type: 'action' },
      ],
    },
    {
      title: 'Connected Apps',
      icon: RiApps2Line,
      items: [
        { label: 'Manage third-party connections', type: 'action' },
      ],
    },
  ];

  return (
    <div className="page-enter mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2 text-softText transition hover:text-white">
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {sections.map(section => (
        <div key={section.title} className="rounded-2xl border border-white/5 bg-card p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-dimText">
            <section.icon size={16} />
            {section.title}
          </div>
          <div className="space-y-3">
            {section.items.map(item => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  {item.type === 'action' && item.value && (
                    <div className="text-xs text-dimText">{item.value as string}</div>
                  )}
                </div>
                {item.type === 'toggle' && (
                  <button
                    className={`relative h-6 w-11 rounded-full transition ${item.value ? 'bg-accent' : 'bg-white/10'}`}
                    onClick={() => {
                      const key = item.label.toLowerCase().replace(/\s+/g, '') as keyof typeof settings;
                      // Simple toggle demo
                      setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
                    }}
                  >
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.value ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                  </button>
                )}
                {item.type === 'select' && (
                  <select className="rounded-lg bg-surface px-3 py-1.5 text-sm text-softText">
                    {item.options?.map(opt => (
                      <option key={opt} value={opt} selected={opt === item.value}>{opt}</option>
                    ))}
                  </select>
                )}
                {item.type === 'action' && (
                  <button className="text-sm text-softText transition hover:text-white">→</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button 
        onClick={() => { logout(); toast.success('Logged out successfully'); navigate('/login'); }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
      >
        <RiLogoutBoxLine size={18} /> Log out
      </button>

      <div className="pb-4 text-center text-xs text-dimText">Go-Music v0.1.0 · Built with ❤️</div>
      <div className="h-8" />
    </div>
  );
}
