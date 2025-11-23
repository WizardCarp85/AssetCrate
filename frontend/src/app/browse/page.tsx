'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AssetCard from '@/components/AssetCard/AssetCard';
import { FaMagnifyingGlass, FaFilter, FaSort } from 'react-icons/fa6';

export default function BrowsePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        sort: searchParams.get('sort') || '-createdAt',
        search: searchParams.get('search') || ''
    });

    const categories = ['All', '3D Models', 'Textures', 'Sounds', 'Scripts', 'VFX', 'UI'];

    useEffect(() => {
        fetchAssets();
    }, [filters]);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            let query = `?sort=${filters.sort}`;
            if (filters.category && filters.category !== 'All') query += `&category=${filters.category}`;
            if (filters.search) query += `&search=${filters.search}`;

            const res = await fetch(`http://localhost:5001/api/assets${query}`);
            const data = await res.json();

            if (data.success) {
                setAssets(data.data);
            }
        } catch (err) {
            console.error('Error fetching assets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Browse <span className="gradient-text">Assets</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Discover premium assets for your next project</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-[#111] rounded-xl p-[1px]">
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full bg-[#0a0a0a] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                            />
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-purple-500 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 animate-slide-up">
                        {/* Categories */}
                        <div className="bg-[#111]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <FaFilter className="text-purple-500" /> Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleFilterChange('category', cat)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${(filters.category === cat || (cat === 'All' && !filters.category))
                                            ? 'gradient-bg-primary text-white shadow-lg shadow-purple-500/20'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="bg-[#111]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <FaSort className="text-purple-500" /> Sort By
                            </h3>
                            <div className="relative">
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-purple-500 appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                                >
                                    <option value="-createdAt">Newest First</option>
                                    <option value="createdAt">Oldest First</option>
                                    <option value="-downloads">Most Popular</option>
                                    <option value="-rating">Highest Rated</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    ▼
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Asset Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-80 bg-[#111] rounded-2xl animate-pulse border border-white/5"></div>
                                ))}
                            </div>
                        ) : assets.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                                {assets.map((asset: any) => (
                                    <AssetCard key={asset._id} asset={asset} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-[#111]/30 rounded-3xl border border-white/5 backdrop-blur-sm">
                                <div className="text-7xl mb-6 opacity-50">🔍</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
                                <p className="text-gray-400">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
