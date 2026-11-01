import type { SVGProps } from 'react';

// Small, consistent outline icons keep the design dependency-free.
const paths = {
  arrowDown: 'M12 5v14m-7-7 7 7 7-7',
  arrowRight: 'M5 12h14m-7-7 7 7-7 7',
  arrowUpRight: 'M7 17 17 7M7 7h10v10',
  bookmark: 'M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-4-7 4Z',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  check: 'm5 12 4 4L19 6',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  message: 'M21 11.5a9 9 0 0 1-13.2 8L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z',
  plus: 'M12 5v14M5 12h14',
  send: 'm22 2-7 20-4-9-9-4 20-7ZM22 2 11 13',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m22 0v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  x: 'm6 6 12 12M6 18 18 6',
};
function icon(name: keyof typeof paths) {
  return function Icon(props: SVGProps<SVGSVGElement>) {
    return <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
  };
}
export const FiArrowDown = icon('arrowDown');
export const FiArrowRight = icon('arrowRight');
export const FiArrowUpRight = icon('arrowUpRight');
export const FiBookmark = icon('bookmark');
export const FiCamera = icon('camera');
export const FiCheck = icon('check');
export const FiHeart = icon('heart');
export const FiMenu = icon('menu');
export const FiMessageCircle = icon('message');
export const FiPlus = icon('plus');
export const FiSend = icon('send');
export const FiUsers = icon('users');
export const FiX = icon('x');
