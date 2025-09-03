'use client'
// components/UserPackageStatus.tsx
import { useEffect, useState } from 'react';

type AdsStatus = {
  ads_id: number;
  used: number;
  limit: number;
  expiry: string;
};

export default function Ads() {
  const [status, setStatus] = useState<AdsStatus | null>(null);

  useEffect(() => {
    fetch('/wp-json/wp/v2/ads', {
      headers: { Authorization: `Bearer ${yourJWT}` },
    })
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  if (!status) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h3>پکیج فعلی شما</h3>
      <p>شناسه پکیج: {status.ads_id}</p>
      <p>تعداد استفاده‌شده: {status.used} / {status.limit}</p>
      <p>تاریخ انقضا: {status.expiry}</p>
    </div>
  );
}
