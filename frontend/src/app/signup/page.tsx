'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaArrowRight, FaTriangleExclamation } from 'react-icons/fa6';

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to browse page
                router.push('/browse');
                router.refresh();
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
        <div className="min-h-screen flex bg-[#050505] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8 lg:p-12 xl:pr-8">
                <div className="max-w-lg relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-12 sm:w-14 h-12 sm:h-14 gradient-bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                            <span className="text-white font-bold text-2xl sm:text-3xl">A</span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">AssetCrate</span>
                    </Link>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                        Join thousands of creators
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8">
                        Start building amazing games with premium assets or share your creations with the community.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="text-3xl font-bold text-white mb-1">10K+</div>
                            <div className="text-sm text-gray-400">Active Users</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="text-3xl font-bold text-white mb-1">50K+</div>
                            <div className="text-sm text-gray-400">Assets</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:pl-8">
                <div className="w-full max-w-lg relative z-10">
                    {/* Mobile Logo */}
                    <Link href="/" className="lg:hidden inline-flex items-center gap-3 mb-8 group">
                        <div className="w-12 h-12 gradient-bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">AssetCrate</span>
                    </Link>

                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-sm sm:text-base text-gray-400 mb-8">
                            Already have an account?{' '}
                            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                    <FaTriangleExclamation className="text-lg" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-500" />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm sm:text-base"
                                        placeholder="johndoe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-500" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm sm:text-base"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-black/20 border border-white/10 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm sm:text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">
                                    I am a...
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'developer' })}
                                        className={`py-3.5 px-4 rounded-xl font-semibold transition-all border-2 ${formData.role === 'developer'
                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                            : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <FaUserTag />
                                            <span>Developer</span>
                                        </div>
                                        <div className="text-xs mt-1 opacity-70">Looking for assets</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'creator' })}
                                        className={`py-3.5 px-4 rounded-xl font-semibold transition-all border-2 ${formData.role === 'creator'
                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                            : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <FaUserTag />
                                            <span>Creator</span>
                                        </div>
                                        <div className="text-xs mt-1 opacity-70">Sharing assets</div>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex items-center justify-center gap-2 py-4 px-6 gradient-bg-primary text-white font-bold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                                {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="text-center text-xs text-gray-500">
                                By signing up, you agree to our{' '}
                                <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms</a>
                                {' '}and{' '}
                                <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
