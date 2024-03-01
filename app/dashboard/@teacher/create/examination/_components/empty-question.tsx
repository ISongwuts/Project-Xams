import React from 'react';
import { CancelFilledIcon } from '@/components/icons';
function EmptyQuestion() {
  return (
    <div className='container border border-primary rounded-xl shadow-lg'>
      <div className='flex flex-col gap-4 h-full justify-center items-center p-8'>
        <p className="text-center text-gray-600">Empty question. Please change the question amount to create the question.</p>
        <CancelFilledIcon color='red' size={60}/>
      </div>
    </div>
  );
}

export default EmptyQuestion;
