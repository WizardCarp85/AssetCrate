'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AssetCard from '@/components/AssetCard/AssetCard';
import { FaMagnifyingGlass, FaFilter, FaSort, FaFire, FaChevronRight, FaChevronLeft, FaBoxOpen } from 'react-icons/fa6';

export default function BrowsePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAssets, setTotalAssets] = useState(0);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        sort: searchParams.get('sort') || '-createdAt',
        search: searchParams.get('search') || ''
    });

    const categories = ['All', '3D Models', 'Textures', 'Sounds', 'Scripts', 'VFX', 'UI'];

    useEffect(() => {
        fetchAssets();
    }, [filters, currentPage]);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            let query = `?sort=${filters.sort}&page=${currentPage}&limit=12`;
            if (filters.category && filters.category !== 'All') query += `&category=${filters.category}`;
            if (filters.search) query += `&search=${filters.search}`;

            const res = await fetch(`http://localhost:5001/api/assets${query}`);
            const data = await res.json();

            if (data.success) {
                setAssets(data.data);
                setPagination(data.pagination);
                setTotalAssets(data.total);
            }
        } catch (err) {
            console.error('Error fetching assets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to page 1 when filters change
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                            <FaFire className="text-orange-400 animate-pulse" />
                            Trending Assets
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Discover Premium <span className="gradient-text">Game Assets</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Browse our curated collection of high-quality assets. From 3D models to sound effects, find everything you need.
                        </p>

                        {/* Search Bar - Enhanced */}
                        <div className="relative max-w-2xl mx-auto group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative bg-[#0a0a0a] rounded-2xl p-[2px] shadow-2xl">
                                <div className="bg-[#111] rounded-2xl flex items-center overflow-hidden">
                                    <div className="pl-6 pr-4 text-gray-500 group-hover:text-purple-400 transition-colors">
                                        <FaMagnifyingGlass className="text-xl" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search for 3D models, textures, sounds..."
                                        value={filters.search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                        className="flex-1 bg-transparent py-5 pr-6 text-white placeholder-gray-500 focus:outline-none text-lg"
                                    />
                                    {filters.search && (
                                        <button
                                            onClick={() => handleFilterChange('search', '')}
                                            className="px-6 py-2 mr-2 text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Category Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                            {categories.slice(1, 5).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleFilterChange('category', cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filters.category === cat
                                        ? 'gradient-bg-primary text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-20">
                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters - Improved */}
                        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 animate-slide-up">
                            {/* Categories */}
                            <div className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
                                <h3 className="text-white font-bold mb-5 flex items-center gap-2 text-lg">
                                    <div className="w-8 h-8 rounded-lg gradient-bg-secondary flex items-center justify-center">
                                        <FaFilter className="text-white text-sm" />
                                    </div>
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilterChange('category', cat)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between group ${(filters.category === cat || (cat === 'All' && !filters.category))
                                                ? 'gradient-bg-primary text-white shadow-lg shadow-purple-500/20'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <span>{cat}</span>
                                            <FaChevronRight className={`text-xs transition-transform ${(filters.category === cat || (cat === 'All' && !filters.category))
                                                ? 'opacity-100'
                                                : 'opacity-0 group-hover:opacity-50'
                                                }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
                                <h3 className="text-white font-bold mb-5 flex items-center gap-2 text-lg">
                                    <div className="w-8 h-8 rounded-lg gradient-bg-secondary flex items-center justify-center">
                                        <FaSort className="text-white text-sm" />
                                    </div>
                                    Sort By
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        { value: '-createdAt', label: 'Newest First' },
                                        { value: 'createdAt', label: 'Oldest First' },
                                        { value: '-downloads', label: 'Most Popular' },
                                        { value: '-rating', label: 'Highest Rated' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleFilterChange('sort', option.value)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${filters.sort === option.value
                                                ? 'bg-white/10 text-white border border-purple-500/50'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 shadow-2xl">
                                <div className="text-center">
                                    <div className="text-4xl font-bold gradient-text mb-2">{totalAssets}</div>
                                    <div className="text-sm text-gray-400">Total Assets</div>
                                </div>
                            </div>
                        </aside>

                        {/* Asset Grid - Improved */}
                        <div className="flex-grow">
                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {filters.category && filters.category !== 'All' ? filters.category : 'All Assets'}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {loading ? 'Loading...' : `${assets.length} results • Page ${currentPage}`}
                                    </p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="h-80 bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl animate-pulse border border-white/5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : assets.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                                        {assets.map((asset: any) => (
                                            <AssetCard key={asset._id} asset={asset} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && (pagination.next || pagination.prev) && (
                                        <div className="mt-12 flex items-center justify-center gap-2">
                                            {/* Previous Button */}
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={!pagination.prev}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${pagination.prev
                                                    ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                                                    }`}
                                            >
                                                <FaChevronLeft className="text-sm" />
                                                Previous
                                            </button>

                                            {/* Page Numbers */}
                                            <div className="flex items-center gap-2">
                                                {[...Array(Math.ceil(totalAssets / 12))].map((_, idx) => {
                                                    const pageNum = idx + 1;
                                                    // Show first 2, last 2, and current +/- 1
                                                    if (
                                                        pageNum === 1 ||
                                                        pageNum === 2 ||
                                                        pageNum === Math.ceil(totalAssets / 12) ||
                                                        pageNum === Math.ceil(totalAssets / 12) - 1 ||
                                                        Math.abs(pageNum - currentPage) <= 1
                                                    ) {
                                                        return (
                                                            <button
                                                                key={pageNum}
                                                                onClick={() => handlePageChange(pageNum)}
                                                                className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum
                                                                    ? 'gradient-bg-primary text-white shadow-lg shadow-purple-500/30'
                                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                                                    }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    } else if (
                                                        pageNum === currentPage - 2 ||
                                                        pageNum === currentPage + 2
                                                    ) {
                                                        return <span key={pageNum} className="text-gray-600 px-2">...</span>;
                                                    }
                                                    return null;
                                                })}
                                            </div>

                                            {/* Next Button */}
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={!pagination.next}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${pagination.next
                                                    ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                                                    }`}
                                            >
                                                Next
                                                <FaChevronRight className="text-sm" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-32 bg-gradient-to-br from-[#111]/50 to-[#0a0a0a]/50 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <FaBoxOpen className="text-7xl mb-6 opacity-50 mx-auto text-gray-500" />
                                    <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
                                    <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                                    <button
                                        onClick={() => {
                                            setFilters({ category: '', sort: '-createdAt', search: '' });
                                            setCurrentPage(1);
                                        }}
                                        className="px-6 py-3 gradient-bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
        </div>
    );
}
