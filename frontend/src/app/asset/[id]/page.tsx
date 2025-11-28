'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar, FaDownload, FaShare, FaHeart, FaShieldHalved, FaArrowLeft, FaClock, FaFile, FaAward, FaFaceFrown, FaPalette, FaFileLines } from 'react-icons/fa6';

export default function AssetDetailsPage() {
    const params = useParams();
    const [asset, setAsset] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchAsset();
        }
    }, [params.id]);

    const fetchAsset = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${params.id}`);
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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: asset.title,
                text: asset.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white pt-20">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 animate-pulse text-lg">Loading asset...</p>
            </div>
        </div>
    );

    if (!asset) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white pt-20">
            <div className="text-center">
                <FaFaceFrown className="text-7xl mb-6 mx-auto text-gray-600" />
                <h2 className="text-3xl font-bold mb-4">Asset Not Found</h2>
                <p className="text-gray-400 mb-6">The asset you're looking for doesn't exist.</p>
                <Link href="/browse" className="px-6 py-3 gradient-bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity inline-block">
                    Return to Store
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 text-sm mb-8 animate-fade-in">
                    <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Store</span>
                    </Link>
                    <span className="text-gray-700">/</span>
                    <span className="text-gray-400">{asset.category}</span>
                    <span className="text-gray-700">/</span>
                    <span className="text-white font-medium truncate max-w-[300px]">{asset.title}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start animate-slide-up">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Preview Image */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 shadow-2xl shadow-cyan-500/10 group">
                            <img
                                src={asset.imageUrl}
                                alt={asset.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `
                                    <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-blue-900/40 relative overflow-hidden">
                                      <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.05) 20px, rgba(255,255,255,.05) 40px);"></div>
                                      <div class="relative z-10 text-center">
                                        <div class="text-white/90 text-2xl font-bold mb-3">Preview Unavailable</div>
                                        <div class="text-gray-400 text-base">The asset preview image could not be loaded</div>
                                      </div>
                                    </div>
                                  `;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-white border border-white/20">
                                {asset.category}
                            </div>

                            {/* Free Badge */}
                            {asset.price === 0 && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg">
                                    FREE
                                </div>
                            )}
                        </div>

                        {/* Description Card */}
                        <div className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl gradient-bg-secondary flex items-center justify-center">
                                    <FaFileLines className="text-white text-lg" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Description</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {asset.description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {asset.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 text-center">
                                <div className="text-3xl font-bold gradient-text mb-1">{asset.rating}</div>
                                <div className="text-sm text-gray-400">Rating</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 text-center">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">{asset.downloads >= 1000 ? `${(asset.downloads / 1000).toFixed(1)}k` : asset.downloads}</div>
                                <div className="text-sm text-gray-400">Downloads</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl p-6 rounded-2xl border border-green-500/20 text-center">
                                <div className="text-3xl font-bold text-green-400 mb-1">245 MB</div>
                                <div className="text-sm text-gray-400">File Size</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-xl p-6 rounded-2xl border border-orange-500/20 text-center">
                                <div className="text-3xl font-bold text-orange-400 mb-1">v1.0</div>
                                <div className="text-sm text-gray-400">Version</div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Main Info Card */}
                        <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 sticky top-32 shadow-2xl">
                            <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{asset.title}</h1>

                            {/* Author */}
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                                <div className="w-12 h-12 rounded-full gradient-bg-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {asset.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">Created by</div>
                                    <div className="text-white font-semibold text-lg">{asset.author}</div>
                                </div>
                            </div>

                            {/* Price & Rating */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-3xl font-bold">
                                    {asset.price === 0 ? (
                                        <span className="gradient-text">FREE</span>
                                    ) : (
                                        <span className="text-white">${asset.price}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/30">
                                    <FaStar className="text-yellow-400" />
                                    <span className="font-bold text-yellow-400 text-lg">{asset.rating}</span>
                                </div>
                            </div>

                            {/* Download Button */}
                            <a
                                href={asset.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 gradient-bg-primary text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50 hover:-translate-y-1 flex items-center justify-center gap-3 mb-4 group text-lg"
                            >
                                <FaDownload className="group-hover:animate-bounce" />
                                {asset.price === 0 ? 'Download Now' : 'Buy Now'}
                            </a>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-medium ${liked
                                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30'
                                        }`}
                                >
                                    <FaHeart className={liked ? 'fill-current' : ''} />
                                    {liked ? 'Liked' : 'Like'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 font-medium"
                                >
                                    <FaShare /> Share
                                </button>
                            </div>

                            {/* Details */}
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaDownload className="text-xs" /> Downloads
                                    </span>
                                    <span className="text-white font-semibold">{asset.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaAward className="text-xs" /> License
                                    </span>
                                    <span className="text-white font-semibold">Standard License</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaFile className="text-xs" /> File Size
                                    </span>
                                    <span className="text-white font-semibold">245 MB</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaClock className="text-xs" /> Last Updated
                                    </span>
                                    <span className="text-white font-semibold">{new Date(asset.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-green-400 font-medium bg-green-500/5 py-2.5 rounded-lg border border-green-500/20">
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
