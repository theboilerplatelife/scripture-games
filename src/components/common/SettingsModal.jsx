import { useEffect } from "react";
import { TRANSLATIONS } from "../../data/translations.js";
import { audio } from "../../audio/SoundEngine.js";

export function SettingsModal({
  isOpen,
  onClose,
  translation,
  onSelectTranslation,
  musicOn,
  onToggleMusic,
  bgmVol = 25,
  onChangeBgmVol,
  sfxVol = 50,
  onChangeSfxVol,
  onResetProgress,
}) {
  // Keyboard users close with Escape (backdrop click stays as a
  // pointer-only convenience)
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- pointer-only backdrop dismiss; keyboard users have Escape and the Close button
    <div className="vb-modal-backdrop" onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop dismissal when clicking inside the dialog */}
      <div
        className="vb-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vb-settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="vb-tape vb-tape-top" />
        
        <div className="vb-modal-header">
          <h2 className="vb-modal-title" id="vb-settings-title">⚙️ Game Settings</h2>
          <button className="vb-modal-close" onClick={onClose} aria-label="Close Settings">✕</button>
        </div>

        {/* Translation Selector */}
        <div className="vb-settings-section">
          <h3 className="vb-settings-heading">📖 Bible Translation</h3>
          <p className="vb-settings-desc">Choose which translation to use for all verses:</p>
          
          <div className="vb-trans-grid">
            {TRANSLATIONS.map((t) => {
              const active = translation === t.id;
              return (
                <button
                  key={t.id}
                  className={`vb-trans-card ${active ? "active" : ""}`}
                  onClick={() => {
                    audio.playButtonClick();
                    onSelectTranslation(t.id);
                  }}
                >
                  <div className="vb-trans-top">
                    <span className="vb-trans-tag">{t.shortName}</span>
                    <span className="vb-trans-badge">{t.badge}</span>
                  </div>
                  <div className="vb-trans-name">{t.name}</div>
                  <div className="vb-trans-tagline">{t.tagline}</div>
                  {active && <span className="vb-trans-check">✓ Active</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Toggle & Volume Sliders Section */}
        <div className="vb-settings-section">
          <h3 className="vb-settings-heading">🎵 Audio & Volume Controls</h3>
          
          <div className="vb-setting-row">
            <span>Master Mute</span>
            <button
              className={`vb-toggle-switch ${musicOn ? "on" : "off"}`}
              onClick={() => {
                audio.init();
                onToggleMusic();
              }}
            >
              {musicOn ? "🔊 Audio On" : "🔇 Muted"}
            </button>
          </div>

          {/* BGM Volume Slider */}
          <div className={`vb-setting-row slider-row ${!musicOn ? "disabled-row" : ""}`}>
            <div className="vb-slider-info">
              <span>🎵 Music Volume (BGM)</span>
              <span className="vb-slider-val">{musicOn ? `${bgmVol}%` : "0%"}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bgmVol}
              disabled={!musicOn}
              aria-label="Background music volume"
              className="vb-range-slider"
              onChange={(e) => {
                audio.init();
                onChangeBgmVol(Number(e.target.value));
              }}
            />
          </div>

          {/* SFX Volume Slider */}
          <div className={`vb-setting-row slider-row ${!musicOn ? "disabled-row" : ""}`}>
            <div className="vb-slider-info">
              <span>✨ Sound Effects (SFX)</span>
              <span className="vb-slider-val">{musicOn ? `${sfxVol}%` : "0%"}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVol}
              disabled={!musicOn}
              aria-label="Sound effects volume"
              className="vb-range-slider"
              onChange={(e) => {
                audio.init();
                onChangeSfxVol(Number(e.target.value));
              }}
            />
          </div>
        </div>

        {/* Reset Progress Section */}
        {onResetProgress && (
          <div className="vb-settings-section danger-zone">
            <h3 className="vb-settings-heading">🔄 Progress Data</h3>
            <div className="vb-setting-row">
              <span className="vb-setting-note">Reset all earned stars and unlocked chapters:</span>
              <button
                className="vb-reset-btn"
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all earned stars and progress?")) {
                    onResetProgress();
                    onClose();
                  }
                }}
              >
                Reset Stars
              </button>
            </div>
          </div>
        )}

        <div className="vb-modal-footer">
          <button className="vb-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
