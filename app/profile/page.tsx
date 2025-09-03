import Sidebar from '../components/Sidebar'

export default function Profile() {
  const user = {
    name: 'Gholly',
    email: 'gholly@example.com',
    role: 'مدیر سیستم',
    joined: '2023-04-12',
    avatar: 'https://i.pravatar.cc/100?u=gholly',
  };

  return (
    <div className="flex h-screen bg-gray-100">
     <Sidebar />
     <main className="flex-1 p-6 overflow-y-auto">
      <div className="justify-between items-center mb-6">
         <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border shadow"
        />
        <h1 className="text-2xl font-semibold">خوش اومدی، {user.name} 👋</h1>
        <p>ایمیل: {user.email}</p>
      </div>  
     </main>
     </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
