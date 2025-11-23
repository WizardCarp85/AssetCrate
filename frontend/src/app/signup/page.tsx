'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'developer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to login page
                router.push('/login?registered=true');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <Link
                href="/"
                className="absolute top-8 left-8 text-gray-400 hover:text-white font-semibold flex items-center gap-2 transition-colors z-10"
            >
                ← Back to Home
            </Link>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-12 h-12 gradient-bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">AssetCrate</span>
                    </Link>
                    <h2 className="mt-6 text-4xl font-bold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="johndoe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                minLength={6}
                            />
                            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                        </div>

                        <div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">
                                    What brings you here?
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'developer' })}
                                        className={`p-3 rounded-lg border transition-all text-center ${formData.role === 'developer'
                                            ? 'border-purple-500 bg-purple-500/20 text-white'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">👤 Developer</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'creator' })}
                                        className={`p-3 rounded-lg border transition-all text-center ${formData.role === 'creator'
                                            ? 'border-purple-500 bg-purple-500/20 text-white'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">✨ Creator</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white gradient-bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-500">
                                    By signing up, you agree to our Terms and Privacy Policy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
