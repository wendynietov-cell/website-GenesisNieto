import { useState } from "react";
import { isAuthenticated, AUTH_KEY } from "@/components/admin/shared";
import LoginScreen from "@/components/admin/login";
import AdminDashboard from "@/components/admin/dashboard";

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated);
  const handleLogout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false); };
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
