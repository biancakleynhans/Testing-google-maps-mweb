import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MdClose } from 'react-icons/md';

interface iProps {
  displayChild: JSX.Element;
  isOpen: boolean;
  handleIsOpen: () => void;
}

export default function DynamicPopOver(props: iProps) {
  const { displayChild, handleIsOpen, isOpen } = props;

  return (
    <Dialog open={isOpen} onClose={() => handleIsOpen()} className='relative z-50'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className='mt-16 w-full h-full rounded bg-white overflow-y-scroll'>
          {/* Child containing all displays   */}
          {displayChild}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
