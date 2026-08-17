export function IconBack(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function IconBag(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5.5 8h13l-1.1 11.2a1.6 1.6 0 0 1-1.6 1.4H8.2a1.6 1.6 0 0 1-1.6-1.4L5.5 8z" />
      <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function IconHeart({ filled, ...props }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20.4C12 20.4 4 15.6 4 10.5 4 8 6 6 8.5 6 10.2 6 11.5 7 12 8.1 12.5 7 13.8 6 15.5 6 18 6 20 8 20 10.5 20 15.6 12 20.4 12 20.4Z" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5.5H9V20H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function IconWhatsApp(props) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 11.6a8 8 0 0 1-11.9 7L4 20l1.5-4a8 8 0 1 1 14.5-4.4z" />
      <path d="M9.2 9.4c0 3 2.4 5.4 5.4 5.4" />
    </svg>
  );
}

export function IconClose(props) {
  return <span {...props}>×</span>;
}
