'use client';

import { useState, useEffect } from 'react';
import { FaUsers, FaBoxOpen, FaClock, FaCircleCheck, FaCircleXmark, FaUserShield, FaPenToSquare } from 'react-icons/fa6';
import AssetReviewModal from '@/components/AssetReviewModal/AssetReviewModal';
import UploadModal from '@/components/UploadModal/UploadModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal/DeleteConfirmModal';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [approving, setApproving] = useState<string | null>(null);
    const [reviewAsset, setReviewAsset] = useState<any>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState<any>(null);

    const [showAllAssets, setShowAllAssets] = useState(false);
    const [allAssets, setAllAssets] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('newest');

    const [showPendingAssets, setShowPendingAssets] = useState(true);
    const [pendingAssets, setPendingAssets] = useState<any[]>([]);
    const [pendingPage, setPendingPage] = useState(1);
    const [pendingTotalPages, setPendingTotalPages] = useState(1);
    const [pendingSortBy, setPendingSortBy] = useState('newest');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (showAllAssets) {
            fetchAdminAssets();
        }
    }, [showAllAssets, currentPage, sortBy]);

    useEffect(() => {
        if (showPendingAssets) {
            fetchPendingAssets();
        }
    }, [showPendingAssets, pendingPage, pendingSortBy]);

    const fetchAdminAssets = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin/assets?page=${currentPage}&limit=8&sort=${sortBy}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.success) {
                setAllAssets(result.data);
                setTotalPages(result.totalPages);
            }
        } catch (error) {
            console.error('Error fetching admin assets:', error);
        }
    };

    const fetchPendingAssets = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin/pending-assets?page=${pendingPage}&limit=8&sort=${pendingSortBy}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.success) {
                setPendingAssets(result.data);
                setPendingTotalPages(result.totalPages);
            }
        } catch (error) {
            console.error('Error fetching pending assets:', error);
        }
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin`, {
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

    const handleApproval = async (assetId: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
        setApproving(assetId);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin/asset/${assetId}/approve`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status, rejectionReason })
            });

            const result = await res.json();
            if (result.success) {
                fetchDashboardData();
                fetchPendingAssets();
                fetchAdminAssets();
            }
        } catch (error) {
            console.error('Error approving asset:', error);
        } finally {
            setApproving(null);
        }
    };

    const handleDeleteAsset = async () => {
        if (!assetToDelete) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await res.json();
            if (result.success) {
                fetchDashboardData();
                fetchAdminAssets();
                fetchPendingAssets();
                setDeleteModalOpen(false);
                setAssetToDelete(null);
            }
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    const openDeleteModal = (asset: any) => {
        setAssetToDelete(asset);
        setDeleteModalOpen(true);
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
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-400 mb-12">Manage users, approve assets, and monitor platform activity</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    <div className="bg-linear-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg gradient-bg-primary flex items-center justify-center">
                                <FaUsers className="text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">{data?.stats.totalUsers || 0}</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-semibold">Total Users</h3>
                    </div>

                    <div className="bg-linear-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <FaBoxOpen className="text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">{data?.stats.totalAssets || 0}</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-semibold">Total Assets</h3>
                    </div>

                    <div className="bg-linear-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                <FaClock className="text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">{data?.stats.pendingApprovals || 0}</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-semibold">Pending Approvals</h3>
                    </div>

                    <div className="bg-linear-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <FaUserShield className="text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">{data?.stats.usersByRole?.admin || 0}</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-semibold">Admins</h3>
                    </div>
                </div>

                =                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">Pending Asset Approvals</h2>
                        <div className="flex items-center gap-3">
                            {showPendingAssets && (
                                <select
                                    value={pendingSortBy}
                                    onChange={(e) => setPendingSortBy(e.target.value)}
                                    className="bg-[#111] border border-white/10 text-gray-300 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="a-z">Name (A-Z)</option>
                                    <option value="z-a">Name (Z-A)</option>
                                </select>
                            )}
                            <button
                                onClick={() => setShowPendingAssets(!showPendingAssets)}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold whitespace-nowrap"
                            >
                                {showPendingAssets ? 'Hide Assets' : 'Show Pending Assets'}
                            </button>
                        </div>
                    </div>

                    {showPendingAssets && (
                        <>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                {pendingAssets.map((asset: any) => (
                                    <div
                                        key={asset._id}
                                        className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-4 sm:p-6"
                                    >
                                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10">
                                                <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="grow">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{asset.title}</h3>
                                                        <p className="text-gray-400 text-sm line-clamp-2 mb-2">{asset.description}</p>
                                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-400">
                                                            <span className="text-cyan-400 font-semibold">{asset.category}</span>
                                                            <span>by {asset.author}</span>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-1">
                                                        <FaClock /> Pending
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                                                    <button
                                                        onClick={() => setReviewAsset(asset)}
                                                        className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm font-semibold"
                                                    >
                                                        Review Asset
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditAsset(asset)}
                                                        className="px-3 sm:px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2"
                                                    >
                                                        <FaPenToSquare /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleApproval(asset._id, 'approved')}
                                                        disabled={approving === asset._id}
                                                        className="px-4 sm:px-6 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        <FaCircleCheck />
                                                        {approving === asset._id ? 'Processing...' : 'Approve'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleApproval(asset._id, 'rejected')}
                                                        disabled={approving === asset._id}
                                                        className="px-4 sm:px-6 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        <FaCircleXmark />
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center gap-4">
                                <button
                                    onClick={() => setPendingPage(prev => Math.max(prev - 1, 1))}
                                    disabled={pendingPage === 1}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-400">
                                    Page {pendingPage} of {pendingTotalPages}
                                </span>
                                <button
                                    onClick={() => setPendingPage(prev => Math.min(prev + 1, pendingTotalPages))}
                                    disabled={pendingPage === pendingTotalPages}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">Manage All Assets</h2>
                        <div className="flex items-center gap-3">
                            {showAllAssets && (
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-[#111] border border-white/10 text-gray-300 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="a-z">Name (A-Z)</option>
                                    <option value="z-a">Name (Z-A)</option>
                                </select>
                            )}
                            <button
                                onClick={() => setShowAllAssets(!showAllAssets)}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold whitespace-nowrap"
                            >
                                {showAllAssets ? 'Hide Assets' : 'Show All Assets'}
                            </button>
                        </div>
                    </div>

                    {showAllAssets && (
                        <>
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                {allAssets.map((asset: any) => (
                                    <div
                                        key={asset._id}
                                        className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 hover:border-cyan-500/30 transition-all"
                                    >
                                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                            <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10">
                                                <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="grow">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white">{asset.title}</h3>
                                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-1">
                                                            <span className="text-cyan-400">{asset.category}</span>
                                                            <span>•</span>
                                                            <span>{asset.approvalStatus}</span>
                                                            <span>•</span>
                                                            <span>by {asset.author}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditAsset(asset)}
                                                            className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs font-semibold flex items-center gap-2"
                                                        >
                                                            <FaPenToSquare /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(asset)}
                                                            className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-xs font-semibold flex items-center gap-2"
                                                        >
                                                            <FaCircleXmark /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center gap-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-400">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {data?.recentUsers && data.recentUsers.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Users</h2>
                        <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Username</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Email</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Role</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {data.recentUsers.map((user: any) => (
                                            <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-white font-semibold">{user.username}</td>
                                                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                        user.role === 'creator' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {(!pendingAssets || pendingAssets.length === 0) && (!allAssets || allAssets.length === 0) && (
                    <div className="text-center py-12 bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10">
                        <FaCircleCheck className="text-5xl text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
                        <p className="text-gray-400">No pending asset approvals at the moment.</p>
                    </div>
                )}
            </div>

            <AssetReviewModal
                isOpen={!!reviewAsset}
                onClose={() => setReviewAsset(null)}
                asset={reviewAsset}
                onApprove={() => {
                    if (reviewAsset) {
                        handleApproval(reviewAsset._id, 'approved');
                        setReviewAsset(null);
                    }
                }}
                onReject={(reason) => {
                    if (reviewAsset) {
                        handleApproval(reviewAsset._id, 'rejected', reason);
                        setReviewAsset(null);
                    }
                }}
                isProcessing={approving === reviewAsset?._id}
            />

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={fetchDashboardData}
                initialData={editingAsset}
            />

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setAssetToDelete(null);
                }}
                onConfirm={handleDeleteAsset}
                title="Delete Asset"
                message="Do you really want to delete this asset?"
                itemName={assetToDelete?.title}
            />
        </div>
    );
}
