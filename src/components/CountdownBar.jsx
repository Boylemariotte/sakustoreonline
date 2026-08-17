import { countdownParts } from '../utils/format.js';

export function CountdownBar({ theme, now, cdDefault, variant = 'mobile' }) {
  if (!theme.cdOn) return null;
  const until = theme.cdUntil ? new Date(theme.cdUntil).getTime() : cdDefault;
  const cd = countdownParts(until, now);
  const text = cd.over ? (theme.cdDone || 'Colección renovada.') : (theme.cdText || 'Últimas unidades de esta colección');

  return (
    <div className={`cd-bar cd-bar--${variant}`} style={{ background: theme.ink, color: theme.cream }}>
      <div className="cd-text">{text}</div>
      {!cd.over && (
        <div className="cd-units">
          <CdUnit value={cd.d} label="días" cream={theme.cream} />
          <CdUnit value={cd.h} label="hrs" cream={theme.cream} />
          <CdUnit value={cd.m} label="min" cream={theme.cream} />
          <CdUnit value={cd.s} label="seg" cream={theme.cream} />
        </div>
      )}
    </div>
  );
}

function CdUnit({ value, label, cream }) {
  return (
    <div className="cd-unit">
      <div className="cd-unit-num" style={{ color: cream }}>{value}</div>
      <div className="cd-unit-label">{label}</div>
    </div>
  );
}
