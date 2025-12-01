'use client';

import { useState } from 'react';
import { FaXmark, FaUpload, FaImage, FaLink, FaTags } from 'react-icons/fa6';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function UploadModal({ isOpen, onClose, onSuccess, initialData }: { isOpen: boolean; onClose: () => void; onSuccess: () => void; initialData?: any }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '3D Models',
        imageUrl: '',
        fileUrl: '',
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['3D Models', 'Textures', 'Sounds', 'Scripts', 'VFX', 'UI', '2D'];

    // Load initial data when modal opens or initialData changes
    if (isOpen && initialData && formData.title === '' && !loading) {
        setFormData({
            title: initialData.title || '',
            description: initialData.description || '',
            category: initialData.category || '3D Models',
            imageUrl: initialData.imageUrl || '',
            fileUrl: initialData.fileUrl || '',
            tags: initialData.tags ? initialData.tags.join(', ') : ''
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const url = initialData
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/assets/${initialData._id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/assets`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    tags: tagsArray
                })
            });

            const result = await res.json();

            if (result.success) {
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    category: '3D Models',
                    imageUrl: '',
                    fileUrl: '',
                    tags: ''
                });
                onSuccess();
                onClose();
            } else {
                setError(result.message || 'Operation failed');
            }
        } catch (err) {
            setError('Failed to save asset');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#111]/95 to-[#0a0a0a]/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">{initialData ? 'Edit Asset' : 'Upload Asset'}</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <FaXmark className="text-gray-400" />
                    </button>
                </div>

                <p className="text-gray-400 mb-6">
                    {initialData ? 'Update your asset details below.' : 'Your asset will be pending admin approval before appearing in the store.'}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="Sci-Fi Weapon Pack"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Description *
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                            placeholder="Describe your asset..."
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            <FaImage className="text-cyan-400" />
                            Preview Image URL *
                        </label>
                        <input
                            type="url"
                            required
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* File URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            <FaLink className="text-cyan-400" />
                            Download Link *
                        </label>
                        <input
                            type="url"
                            required
                            value={formData.fileUrl}
                            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="https://drive.google.com/..."
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            <FaTags className="text-cyan-400" />
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="scifi, weapon, 3d"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 gradient-bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {initialData ? 'Updating...' : 'Uploading...'}
                                </>
                            ) : (
                                <>
                                    <FaUpload />
                                    {initialData ? 'Update Asset' : 'Upload Asset'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
