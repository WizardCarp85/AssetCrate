import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaDownload, FaArrowRight } from 'react-icons/fa6';

interface AssetProps {
    _id: string;
    title: string;
    category: string;
    price: number;
    rating: number;
    downloads: number;
    imageUrl: string;
    author: string;
}

export default function AssetCard({ asset }: { asset: AssetProps }) {
    return (
        <Link href={`/asset/${asset._id}`} className="group block h-full">
            <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 h-full flex flex-col relative">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 rounded-2xl"></div>

                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-cyan-900/20 to-blue-900/20">
                    <img
                        src={asset.imageUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/PreviewUnavailable.png'; // Fallback image
                            target.onerror = null; // Prevent infinite loop if fallback fails
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/20 shadow-lg">
                        {asset.category}
                    </div>

                    {/* Free Badge */}
                    {asset.price === 0 && (
                        <div className="absolute top-3 right-3 bg-linear-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg shadow-green-500/50 animate-pulse">
                            FREE
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-cyan-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="flex items-center gap-2 text-white text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col grow relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300 line-clamp-1">
                        {asset.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full gradient-bg-secondary flex items-center justify-center text-white text-xs font-bold">
                            {asset.author.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{asset.author}</p>
                    </div>

                    {/* Stats */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
                                <FaStar className="text-yellow-400 text-xs" />
                                <span className="font-bold text-yellow-400 text-sm">{asset.rating}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-cyan-400 transition-colors">
                            <FaDownload className="text-xs" />
                            <span className="text-sm font-medium">
                                {asset.downloads >= 1000 ? `${(asset.downloads / 1000).toFixed(1)}k` : asset.downloads}
                            </span>
                        </div>
                    </div>

                    {/* Price Tag */}
                    {asset.price > 0 && (
                        <div className="mt-3 text-center">
                            <div className="inline-block px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                                <span className="text-lg font-bold gradient-text">${asset.price}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
