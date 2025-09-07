'use client';

import React, { useState } from 'react';

const CreateListingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    price: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    tags: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    // ارسال به API وردپرس
    const res = await fetch('https://your-wp-site.com/wp-json/wp/v2/ads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer YOUR_JWT_TOKEN`,
      },
      body: form,
    });

    if (res.ok) {
      alert('آگهی با موفقیت ثبت شد!');
    } else {
      alert('خطا در ثبت آگهی');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">ثبت آگهی جدید</h2>

      {[
        { name: 'title', label: 'عنوان آگهی' },
        { name: 'description', label: 'توضیحات', type: 'textarea' },
        { name: 'category', label: 'دسته‌بندی' },
        { name: 'location', label: 'موقعیت مکانی' },
        { name: 'price', label: 'قیمت' },
        { name: 'contactName', label: 'نام تماس‌گیرنده' },
        { name: 'contactEmail', label: 'ایمیل تماس‌گیرنده' },
        { name: 'phone', label: 'شماره تماس' },
        { name: 'tags', label: 'برچسب‌ها' },
      ].map(({ name, label, type }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          {type === 'textarea' ? (
            <textarea
              name={name}
              id={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <input
              type="text"
              name={name}
              id={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">تصویر آگهی</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md p-2 bg-white"
        />
      </div>

      <button
        type="submit"
        className="max-w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        ثبت آگهی
      </button>
    </form>
  );
};

export default CreateListingForm;
