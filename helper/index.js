// app/helper.js
import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();

  const checkActivePath = (path) => {
    if (path === '/' && pathname !== path) {
      return false;
    }
    return pathname.startsWith(path);
  };

  return checkActivePath;
}


export function useActivePathProfile() {
  const pathname = usePathname();

  const checkActivePath = (path) => {
    if (path === '/user-profile' && pathname !== path) {
      return false;
    }
    return pathname.startsWith(path);
  };

  return checkActivePath;
}


export function getRandomCuisines(cuisines, count) {
  // Create a copy of the array and shuffle it
  const shuffled = [...cuisines].sort(() => 0.5 - Math.random());
  // Get the first `count` elements
  return shuffled.slice(0, count);
}