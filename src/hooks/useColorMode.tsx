import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    // const className = 'dark';
    const className = 'light';
    const bodyClass = window.document.body.classList;

    bodyClass.add(className)
    // colorMode === 'dark'
    //   ? bodyClass.add(className)
    //   : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
