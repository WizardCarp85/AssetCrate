'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDownload, FaHeart, FaClock, FaEye } from 'react-icons/fa6';

export default function DeveloperDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5001/api/dashboard/developer', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await res.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Developer Dashboard</h1>
                <p className="text-gray-400 mb-12">Track your downloads and favorite assets</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
                    <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center">
                                <FaDownload className="text-white text-xl" />
                            </div>
                            <span className="text-3xl font-bold text-white">{data?.stats.totalDownloads || 0}</span>
                        </div>
                        <h3 className="text-gray-400 font-semibold">Total Downloads</h3>
                    </div>

                    <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                                <FaHeart className="text-white text-xl" />
                            </div>
                            <span className="text-3xl font-bold text-white">{data?.stats.totalFavorites || 0}</span>
                        </div>
                        <h3 className="text-gray-400 font-semibold">Favorite Assets</h3>
                    </div>
                </div>

                {/* Favorite Assets */}
                {data?.favorites && data.favorites.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Your Favorites</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {data.favorites.map((asset: any) => (
                                <Link
                                    key={asset._id}
                                    href={`/asset/${asset._id}`}
                                    className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                                        <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{asset.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{asset.description}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-cyan-400 font-semibold">{asset.category}</span>
                                            <span className="text-gray-500">{asset.downloads} downloads</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Downloads */}
                {data?.recentDownloads && data.recentDownloads.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Downloads</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {data.recentDownloads.map((asset: any) => asset && (
                                <Link
                                    key={asset._id}
                                    href={`/asset/${asset._id}`}
                                    className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                                        <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{asset.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{asset.description}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-cyan-400 font-semibold">{asset.category}</span>
                                            <span className="text-gray-500">{asset.downloads} downloads</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!data?.favorites || data.favorites.length === 0) && (!data?.recentDownloads || data.recentDownloads.length === 0) && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                            <FaDownload className="text-4xl text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">No Activity Yet</h3>
                        <p className="text-gray-400 mb-8">Start exploring and downloading assets to see them here!</p>
                        <Link
                            href="/browse"
                            className="inline-block px-8 py-4 gradient-bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/30"
                        >
                            Browse Assets
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
