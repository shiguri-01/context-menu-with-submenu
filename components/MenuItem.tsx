
import React, { useState, useRef, useEffect } from 'react';
import type { MenuItemType } from '../types';
import { ChevronRightIcon } from './Icons';

interface MenuItemProps {
  item: MenuItemType;
  onClose: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onClose }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const menuItemRef = useRef<HTMLLIElement>(null);

  if (item.separator) {
    return <hr className="my-1.5 border-gray-200 dark:border-gray-600" />;
  }

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;
    if (item.onClick) {
      e.stopPropagation();
      item.onClick();
      onClose();
    }
  };

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const handleMouseEnter = () => {
    if (hasSubmenu) {
      setShowSubmenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasSubmenu) {
      setShowSubmenu(false);
    }
  };

  return (
    <li
      ref={menuItemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className="w-full flex items-center justify-between text-left px-3 py-1.5 text-sm rounded-md transition-colors duration-150
                   text-gray-700 dark:text-gray-200 
                   hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400 dark:disabled:text-gray-500"
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        {hasSubmenu && <ChevronRightIcon />}
      </button>

      {hasSubmenu && showSubmenu && (
        <Submenu items={item.submenu!} onClose={onClose} parentRef={menuItemRef} />
      )}
    </li>
  );
};

interface SubmenuProps {
    items: MenuItemType[];
    onClose: () => void;
    parentRef: React.RefObject<HTMLLIElement>;
}

const Submenu: React.FC<SubmenuProps> = ({ items, onClose, parentRef }) => {
    const submenuRef = useRef<HTMLUListElement>(null);
    const [position, setPosition] = useState({ top: -8, left: '100%' });

    useEffect(() => {
        if (parentRef.current && submenuRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const submenuRect = submenuRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let newLeft = parentRect.width - 8;
            let newTop = -8;

            if (parentRect.right + submenuRect.width > screenWidth) {
                newLeft = -parentRect.width + 8;
            }
            if (parentRect.top + submenuRect.height > screenHeight) {
                newTop = -(submenuRect.height - parentRect.height) + 8;
            }

            setPosition({ top: newTop, left: `${newLeft}px` });
        }
    }, [parentRef]);
    
    return (
        <ul
            ref={submenuRef}
            style={{ top: position.top, left: position.left }}
            className="absolute z-10 min-w-[220px] p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up"
        >
            {items.map((subItem, index) => (
                <MenuItem key={index} item={subItem} onClose={onClose} />
            ))}
        </ul>
    );
}
