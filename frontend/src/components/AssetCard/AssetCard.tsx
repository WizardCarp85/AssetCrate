import Link from 'next/link';
import { FaStar, FaDownload } from 'react-icons/fa6';

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
            <div className="bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={asset.imageUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-white border border-white/10">
                        {asset.category}
                    </div>
                    {asset.price === 0 && (
                        <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-white shadow-lg">
                            FREE
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
                        {asset.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{asset.author}</p>

                    <div className="mt-auto flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-400">
                            <FaStar />
                            <span className="font-medium text-gray-300">{asset.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <FaDownload className="text-xs" />
                            <span>{asset.downloads >= 1000 ? `${(asset.downloads / 1000).toFixed(1)}k` : asset.downloads}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
