import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Battery, ShieldCheck, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Habtamu Batteries</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-stone-900 flex flex-col">
        {/* Slim top bar — admin only, NO public navbar */}
        <header className="bg-stone-800 border-b border-stone-700">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck size={20} className="text-brand-400" />
              <span className="font-semibold tracking-wide">Admin Portal</span>
            </div>
            <Link
              to="/"
              className="text-sm text-stone-300 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to website
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <form
            onSubmit={submit}
            className="bg-stone-800 p-8 rounded-2xl shadow-xl border border-stone-700 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand-600 p-3 rounded-lg">
                <Battery className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Staff Sign-in</h1>
                <p className="text-sm text-stone-400">Authorized personnel only</p>
              </div>
            </div>

            <label className="block mb-3">
              <span className="text-sm font-medium text-stone-300">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input mt-1 bg-stone-900 border-stone-700 text-white placeholder-stone-500"
                placeholder="admin@habtamu.com"
                autoComplete="email"
              />
            </label>

            <label className="block mb-5">
              <span className="text-sm font-medium text-stone-300">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input mt-1 bg-stone-900 border-stone-700 text-white placeholder-stone-500"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                autoComplete="current-password"
              />
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign in to dashboard'}
            </button>

            <p className="text-xs text-stone-500 mt-4 text-center">
              Demo: admin@habtamu.com / admin123
            </p>
          </form>
        </main>
      </div>
    </>
  );
}