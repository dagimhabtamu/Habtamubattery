import { Outlet } from 'react-router-dom';

export default function AdminShell() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Outlet />
    </div>
  );
}