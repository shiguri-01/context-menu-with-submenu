
import type React from 'react';

export interface MenuItemType {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  submenu?: MenuItemType[];
  separator?: boolean;
  disabled?: boolean;
}
