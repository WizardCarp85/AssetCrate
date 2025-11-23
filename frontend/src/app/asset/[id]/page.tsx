'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaStar, FaDownload, FaShare, FaHeart, FaShieldHalved, FaArrowLeft } from 'react-icons/fa6';

export default function AssetDetailsPage() {
    const params = useParams();
    const [asset, setAsset] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchAsset();
        }
    }, [params.id]);

    const fetchAsset = async () => {
        try {
            const res = await fetch(`http://localhost:5001/api/assets/${params.id}`);
            const data = await res.json();
            if (data.success) {
                setAsset(data.data);
            }
        } catch (err) {
            console.error('Error fetching asset:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 animate-pulse">Loading asset...</p>
            </div>
        </div>
    );

    if (!asset) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Asset Not Found</h2>
                <Link href="/browse" className="text-purple-400 hover:text-purple-300 underline">Return to Store</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 animate-fade-in">
                    <Link href="/browse" className="flex items-center gap-2 hover:text-white transition-colors group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Store
                    </Link>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span className="text-gray-300">{asset.category}</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span className="text-white truncate max-w-[200px] font-medium">{asset.title}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 animate-slide-up">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Preview Image */}
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl shadow-purple-500/10 relative group">
                            <img
                                src={asset.imageUrl}
                                alt={asset.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all font-semibold">
                                    View Fullscreen
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-[#111]/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg gradient-bg-secondary flex items-center justify-center text-sm">📝</span>
                                Description
                            </h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg font-light">
                                {asset.description}
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {asset.tags.map((tag: string) => (
                                        <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors cursor-default">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 sticky top-32 shadow-2xl shadow-purple-500/5">
                            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{asset.title}</h1>

                            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/5">
                                <div className="w-10 h-10 rounded-full gradient-bg-secondary flex items-center justify-center text-white font-bold">
                                    {asset.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Created by</div>
                                    <div className="text-white font-semibold">{asset.author}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div className="text-4xl font-bold text-white">
                                    {asset.price === 0 ? 'Free' : `$${asset.price}`}
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20">
                                    <FaStar className="text-yellow-400" />
                                    <span className="font-bold text-yellow-400">{asset.rating}</span>
                                </div>
                            </div>

                            <a
                                href={asset.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 gradient-bg-primary text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:-translate-y-1 flex items-center justify-center gap-3 mb-4 group"
                            >
                                <FaDownload className="group-hover:animate-bounce" />
                                {asset.price === 0 ? 'Download Now' : 'Buy Now'}
                            </a>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <button className="py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all flex items-center justify-center gap-2 font-medium">
                                    <FaHeart /> Like
                                </button>
                                <button className="py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium">
                                    <FaShare /> Share
                                </button>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Downloads</span>
                                    <span className="text-white font-medium">{asset.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">License</span>
                                    <span className="text-white font-medium">Standard License</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">File Size</span>
                                    <span className="text-white font-medium">245 MB</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Updated</span>
                                    <span className="text-white font-medium">{new Date(asset.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-green-400 justify-center font-medium bg-green-500/5 py-3 rounded-xl border border-green-500/10">
                                <FaShieldHalved />
                                Secure & Virus Free
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
