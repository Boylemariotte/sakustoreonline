import { countdownParts } from '../utils/format.js';

export function ExclusiveBanner({ untilMs, now }) {
  if (!untilMs) return null;
  const cd = countdownParts(untilMs, now);

  return (
    <div className="exclusive-banner">
      <div className="exclusive-banner-head">
        <span className="exclusive-banner-star">✦</span>
        <div className="exclusive-banner-text">
          {cd.over ? 'Esta edición exclusiva ya se agotó.' : 'Edición exclusiva — termina en:'}
        </div>
      </div>
      {!cd.over && (
        <div className="cd-units">
          <CdUnit value={cd.d} label="días" />
          <CdUnit value={cd.h} label="hrs" />
          <CdUnit value={cd.m} label="min" />
          <CdUnit value={cd.s} label="seg" />
        </div>
      )}
    </div>
  );
}

function CdUnit({ value, label }) {
  return (
    <div className="cd-unit">
      <div className="cd-unit-num">{value}</div>
      <div className="cd-unit-label">{label}</div>
    </div>
  );
}
