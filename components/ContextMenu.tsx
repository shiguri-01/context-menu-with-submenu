
import React from 'react';
import { MenuItem } from './MenuItem';
import type { MenuItemType } from '../types';

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItemType[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Use timeout to prevent immediate closing on the same click that opened it
    setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul
      ref={menuRef}
      style={{ top: `${y}px`, left: `${x}px` }}
      className="fixed z-50 min-w-[220px] p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up"
    >
      {items.map((item, index) => (
        <MenuItem key={index} item={item} onClose={onClose} />
      ))}
    </ul>
  );
};
