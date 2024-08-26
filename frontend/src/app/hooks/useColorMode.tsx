// hooks/useColorMode.ts
import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export type ColorMode = 'light' | 'dark';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>("color-theme", "dark");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.documentElement.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export default useColorMode;