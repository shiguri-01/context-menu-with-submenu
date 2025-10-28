// Fix: Import React to use the 'React.MouseEvent' type on line 8.
import React, { useState, useEffect, useCallback } from 'react';

export const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    
    // Adjust position to prevent menu from appearing off-screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const menuWidth = 200; // An estimated width of the context menu
    const menuHeight = 250; // An estimated height

    let x = event.pageX;
    let y = event.pageY;

    if (x + menuWidth > screenWidth) {
      x = screenWidth - menuWidth - 10;
    }
    if (y + menuHeight > screenHeight) {
      y = screenHeight - menuHeight - 10;
    }

    setAnchorPoint({ x, y });
    setShow(true);
  }, []);

  const handleClick = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return { anchorPoint, show, handleContextMenu, setShow };
};