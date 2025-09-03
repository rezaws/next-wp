'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type AddJobButtonProps = {
  label?: string;
  className?: string;
};

const AddJobButton: React.FC<AddJobButtonProps> = ({
  label = 'افزودن آگهی جدید',
  className = '',
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/add-job'); // مسیر صفحه ثبت آگهی
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {label}
    </button>
  );
};

export default AddJobButton;
