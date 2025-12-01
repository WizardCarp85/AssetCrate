'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUpload, FaDownload, FaEye, FaClock, FaCircleCheck, FaCircleXmark, FaPenToSquare, FaTrash } from 'react-icons/fa6';
import UploadModal from '@/components/UploadModal/UploadModal';

export default function CreatorDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    const [editingAsset, setEditingAsset] = useState<any>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/creator`, {
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

    const handleEditAsset = (asset: any) => {
        setEditingAsset(asset);
        setIsUploadModalOpen(true);
    };

    const handleDeleteAsset = async (assetId: string) => {
        if (!confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
            return;
        }

        setDeleting(assetId);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await res.json();
            if (result.success) {
                // Refresh dashboard data
                fetchDashboardData();
            } else {
                alert(result.message || 'Failed to delete asset');
            }
        } catch (error) {
            console.error('Error deleting asset:', error);
            alert('Failed to delete asset');
        } finally {
            setDeleting(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1"><FaCircleCheck /> Approved</span>;
            case 'pending':
                return <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-1"><FaClock /> Pending</span>;
            case 'rejected':
                return <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><FaCircleXmark /> Rejected</span>;
            default:
                return null;
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
        <>
            <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-12">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Creator Dashboard</h1>
                            <p className="text-gray-400">Manage your uploaded assets and track performance</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingAsset(null);
                                setIsUploadModalOpen(true);
                            }}
                            className="w-full sm:w-auto px-6 py-3 gradient-bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                        >
                            <FaUpload />
                            Upload Asset
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg gradient-bg-primary flex items-center justify-center">
                                    <FaUpload className="text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">{data?.stats.totalUploads || 0}</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold">Total Uploads</h3>
                        </div>

                        <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                    <FaCircleCheck className="text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">{data?.stats.approved || 0}</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold">Approved</h3>
                        </div>

                        <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <FaClock className="text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">{data?.stats.pendingApproval || 0}</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold">Pending</h3>
                        </div>

                        <div className="bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <FaDownload className="text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">{data?.stats.totalDownloads || 0}</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold">Total Downloads</h3>
                        </div>
                    </div>

                    {/* Uploaded Assets */}
                    {data?.assets && data.assets.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Your Assets</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {data.assets.map((asset: any) => (
                                    <div
                                        key={asset._id}
                                        className="bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                                                <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{asset.title}</h3>
                                                        <p className="text-gray-400 text-sm line-clamp-2">{asset.description}</p>
                                                    </div>
                                                    {getStatusBadge(asset.approvalStatus)}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <FaDownload className="text-cyan-400" />
                                                        {asset.downloads} downloads
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaEye className="text-cyan-400" />
                                                        {asset.views} views
                                                    </span>
                                                </div>

                                                {/* Rejection Reason */}
                                                {asset.approvalStatus === 'rejected' && asset.rejectionReason && (
                                                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                                        <p className="text-xs font-semibold text-red-400 mb-1">Rejection Reason:</p>
                                                        <p className="text-sm text-red-300">{asset.rejectionReason}</p>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                                                    {asset.approvalStatus === 'approved' && (
                                                        <Link
                                                            href={`/asset/${asset._id}`}
                                                            className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm font-semibold"
                                                        >
                                                            View
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditAsset(asset)}
                                                        className="px-3 sm:px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2"
                                                    >
                                                        <FaPenToSquare /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAsset(asset._id)}
                                                        disabled={deleting === asset._id}
                                                        className="px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-xs sm:text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
                                                    >
                                                        <FaTrash /> {deleting === asset._id ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                                <FaUpload className="text-4xl text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No Assets Yet</h3>
                            <p className="text-gray-400 mb-8">Upload your first asset to start sharing with the community!</p>
                            <button
                                onClick={() => {
                                    setEditingAsset(null);
                                    setIsUploadModalOpen(true);
                                }}
                                className="inline-block px-8 py-4 gradient-bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/30"
                            >
                                Upload Asset
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={fetchDashboardData}
                initialData={editingAsset}
            />
        </>
    );
}
