'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Check auth status
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }

        // Handle scroll effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
    };

    // Don't show navbar on login/signup pages if you prefer, but usually it's fine.
    // For this design, let's keep it everywhere but maybe simpler on auth pages?
    // The user asked for it to be missing from store page, implying they want it there.
    // So we render it everywhere.

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 gradient-bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">AssetCrate</span>
                    </Link>

                    {isAuthenticated ? (
                        // Authenticated navbar
                        <>
                            <div className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/dashboard"
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${pathname === '/dashboard' ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/browse"
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${pathname === '/browse' ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Store
                                </Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-purple-500/30 transition-colors">
                                        <div className="w-6 h-6 rounded-full gradient-bg-secondary flex items-center justify-center text-xs text-white font-bold shadow-sm">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-semibold text-gray-200">
                                            {user?.username}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        // Guest navbar
                        <>
                            <div className="hidden md:flex items-center gap-8">
                                <Link href="/#features" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                                    Features
                                </Link>
                                <Link href="/#roles" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                                    For Creators
                                </Link>
                                <Link href="/#how-it-works" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                                    How It Works
                                </Link>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-6 py-2.5 text-sm font-semibold text-white gradient-bg-primary rounded-full hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
