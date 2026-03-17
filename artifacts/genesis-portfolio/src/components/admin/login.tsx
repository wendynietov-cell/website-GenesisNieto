import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { ADMIN_PASSWORD, AUTH_KEY } from "@/components/admin/shared";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #EFE3D7 50%, #D7B899 100%)" }}
    >
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(200,168,137,0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Lock size={22} style={{ color: "#5C3C2C" }} />
          </div>
          <h1 className="text-3xl font-heading mb-2" style={{ color: "#5C3C2C" }}>
            Panel de Génesis
          </h1>
          <p className="text-sm" style={{ color: "#8A6B52" }}>
            Ingresa tu contraseña para editar el contenido
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="rounded-3xl p-8 shadow-xl"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(200,168,137,0.35)",
            }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "#5C3C2C" }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="••••••••••"
                  className={`w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200 ${error ? "ring-2 ring-red-400" : "focus:ring-2"}`}
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(200,168,137,0.4)",
                    color: "#5C3C2C",
                    "--tw-ring-color": "#C8A889",
                  } as React.CSSProperties}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-opacity hover:opacity-70"
                  style={{ color: "#8A6B52" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2">
                  Contraseña incorrecta. Inténtalo de nuevo.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#5C3C2C", color: "#FAF8F5" }}
            >
              Ingresar al Panel
            </button>
          </div>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "#B09070" }}>
          <a href="/" className="hover:underline">
            ← Volver al sitio
          </a>
        </p>
      </div>
    </div>
  );
}
