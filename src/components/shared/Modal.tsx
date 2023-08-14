import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface iProps {
  displayChild: any;
  isOpen: boolean;
  isFullScreen: boolean;
  handleIsOpen: () => void;
}

export default function Modal(props: iProps) {
  const { displayChild, handleIsOpen, isOpen, isFullScreen } = props;

  useEffect(() => {}, [isOpen, handleIsOpen, displayChild]);

  return (
    <Dialog open={isOpen} onClose={() => handleIsOpen()} className='relative z-[99999999]'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className={isFullScreen ? 'w-full h-full' : ''}>
          {/* Child containing all displays   */}
          {displayChild}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
