
import React from 'react';
import { ContextMenu } from './components/ContextMenu';
import { useContextMenu } from './hooks/useContextMenu';
import type { MenuItemType } from './types';
import { FilePlusIcon, FolderIcon, SaveIcon, ShareIcon, CopyIcon, TrashIcon, EditIcon, StarIcon, ArchiveIcon } from './components/Icons';

const App: React.FC = () => {
  const { anchorPoint, show, handleContextMenu, setShow } = useContextMenu();

  const menuItems: MenuItemType[] = [
    { label: 'New', icon: <FilePlusIcon />, onClick: () => console.log('New clicked') },
    { label: 'Open', icon: <FolderIcon />, onClick: () => console.log('Open clicked') },
    { label: 'Save', icon: <SaveIcon />, onClick: () => console.log('Save clicked'), disabled: true },
    { separator: true },
    { 
      label: 'Share', 
      icon: <ShareIcon />,
      submenu: [
        { label: 'Email', onClick: () => console.log('Share via Email') },
        { label: 'SMS', onClick: () => console.log('Share via SMS') },
        { label: 'Copy Link', icon: <CopyIcon />, onClick: () => console.log('Copy Link') },
        {
          label: 'More',
          submenu: [
            { label: 'Facebook', onClick: () => console.log('Share on Facebook') },
            { label: 'Twitter', onClick: () => console.log('Share on Twitter') },
          ]
        }
      ] 
    },
    { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit clicked') },
    { separator: true },
    { label: 'Favorite', icon: <StarIcon />, onClick: () => console.log('Favorite clicked') },
    { label: 'Archive', icon: <ArchiveIcon />, onClick: () => console.log('Archive clicked') },
    { separator: true },
    { label: 'Delete', icon: <TrashIcon />, onClick: () => console.log('Delete clicked') },
  ];

  return (
    <div
      onContextMenu={handleContextMenu}
      className="flex items-center justify-center w-full h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 select-none transition-colors duration-300"
    >
      <div className="p-8 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-2">Context Menu Demo</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Right-click anywhere in this area to open the custom context menu.</p>
      </div>
      
      {show && (
        <ContextMenu
          x={anchorPoint.x}
          y={anchorPoint.y}
          items={menuItems}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default App;
