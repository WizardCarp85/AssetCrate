'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaXmark } from 'react-icons/fa6';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }

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

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
                }`}>
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-all duration-300">
                                <img src="/icon.png" alt="AssetCrate Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">AssetCrate</span>
                        </Link>

                        {isAuthenticated ? (
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
                                <div className="hidden md:flex items-center gap-4">
                                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer"
                                        >
                                            <div className="w-6 h-6 rounded-full gradient-bg-secondary flex items-center justify-center text-xs text-white font-bold shadow-sm">
                                                {user?.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-200">
                                                {user?.username}
                                            </span>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>

                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
                                </button>
                            </>
                        ) : (
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
                                <div className="hidden md:flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-6 py-2.5 text-sm font-semibold text-white gradient-bg-primary rounded-full hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
                                    >
                                        Get Started
                                    </Link>
                                </div>

                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="text-lg font-bold text-white">Menu</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <FaXmark className="text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {isAuthenticated ? (
                            <div className="space-y-6">
                                <Link
                                    href="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full gradient-bg-secondary flex items-center justify-center text-sm text-white font-bold shadow-sm">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{user?.username}</div>
                                        <div className="text-xs text-gray-400">View Profile</div>
                                    </div>
                                </Link>

                                <div className="space-y-2">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${pathname === '/dashboard' ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/browse"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${pathname === '/browse' ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        Store
                                    </Link>
                                </div>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-base font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Link
                                        href="/#features"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        href="/#roles"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        For Creators
                                    </Link>
                                    <Link
                                        href="/#how-it-works"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        How It Works
                                    </Link>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full px-6 py-3 text-center text-base font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full px-6 py-3 text-center text-base font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
