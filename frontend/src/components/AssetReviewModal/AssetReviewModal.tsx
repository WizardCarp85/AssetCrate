'use client';

import { useState } from 'react';
import { FaXmark, FaImage, FaLink, FaTags, FaUser, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

interface AssetReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    asset: any;
    onApprove: () => void;
    onReject: (reason: string) => void;
    isProcessing: boolean;
}

export default function AssetReviewModal({
    isOpen,
    onClose,
    asset,
    onApprove,
    onReject,
    isProcessing
}: AssetReviewModalProps) {
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [imageError, setImageError] = useState(false);

    if (!isOpen || !asset) return null;

    const handleReject = () => {
        if (showRejectInput) {
            onReject(rejectionReason);
            setRejectionReason('');
            setShowRejectInput(false);
        } else {
            setShowRejectInput(true);
        }
    };

    const handleClose = () => {
        setShowRejectInput(false);
        setRejectionReason('');
        setImageError(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-linear-to-br from-[#111]/95 to-[#0a0a0a]/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">Review Asset</h2>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <FaXmark className="text-gray-400" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Image Preview */}
                    <div>
                        <label className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                            <FaImage className="text-cyan-400" />
                            Preview Image
                        </label>
                        <div className="aspect-video rounded-2xl overflow-hidden bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 flex items-center justify-center">
                            {!imageError ? (
                                <img
                                    src={asset.imageUrl}
                                    alt={asset.title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 text-gray-500 p-8">
                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span className="text-sm text-center">Image Preview Not Available</span>
                                </div>
                            )}
                        </div>

                        {/* Download Link Test */}
                        <div className="mt-6">
                            <label className=" text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                                <FaLink className="text-cyan-400" />
                                Download Link
                            </label>
                            <a
                                href={asset.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-cyan-400 hover:bg-white/10 transition-colors text-sm break-all"
                            >
                                {asset.fileUrl}
                            </a>
                            <p className="text-xs text-gray-500 mt-2">Click to test the download link</p>
                        </div>
                    </div>

                    {/* Right Column - Asset Details */}
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Title
                            </label>
                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                {asset.title}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Category
                            </label>
                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                {asset.category}
                            </div>
                        </div>

                        {/* Creator */}
                        <div>
                            <label className=" text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                <FaUser className="text-cyan-400" />
                                Created By
                            </label>
                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                {asset.author}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Description
                            </label>
                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white min-h-[100px]">
                                {asset.description}
                            </div>
                        </div>

                        {/* Tags */}
                        {asset.tags && asset.tags.length > 0 && (
                            <div>
                                <label className=" text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                    <FaTags className="text-cyan-400" />
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {asset.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Image URL
                            </label>
                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm break-all">
                                {asset.imageUrl}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rejection Reason Input */}
                {showRejectInput && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <label className="block text-sm font-semibold text-red-400 mb-2">
                            Rejection Reason (will be shown to creator)
                        </label>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-red-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                            placeholder="Explain why this asset was rejected..."
                            autoFocus
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReject}
                        disabled={isProcessing || (showRejectInput && !rejectionReason.trim())}
                        className="flex-1 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <FaCircleXmark />
                        {isProcessing ? 'Processing...' : showRejectInput ? 'Confirm Rejection' : 'Reject'}
                    </button>
                    {!showRejectInput && (
                        <button
                            onClick={onApprove}
                            disabled={isProcessing}
                            className="flex-1 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                        >
                            <FaCircleCheck />
                            {isProcessing ? 'Processing...' : 'Approve'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
