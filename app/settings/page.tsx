import Sidebar from '../components/Sidebar'

export default function Settings() {
  return (
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <h2 className="text-xl font-bold mb-6"></h2>  
        <Sidebar />
        Settings
    </div>
  )
}
