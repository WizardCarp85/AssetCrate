'use client';

import { FaTrash, FaXmark, FaTriangleExclamation } from 'react-icons/fa6';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    itemName?: string;
    isDeleting?: boolean;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Confirmation",
    message = "Do you really want to delete this item?",
    itemName,
    isDeleting = false
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={isDeleting ? undefined : onClose}
            />

            <div className="relative bg-gradient-to-br from-[#111]/95 to-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 max-w-md w-full p-8 animate-slide-up">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-50 animate-pulse" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-400 hover:text-white z-10"
                    disabled={isDeleting}
                >
                    <FaXmark className="text-lg" />
                </button>

                <div className="text-center relative z-10">
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl animate-pulse" />

                            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center">
                                <div className="relative">
                                    <FaTrash className="text-5xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center border-2 border-[#111] shadow-lg">
                                        <FaTriangleExclamation className="text-white text-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                        {title}
                    </h3>

                    <p className="text-gray-300 mb-2 text-lg">
                        {message}
                    </p>

                    {itemName && (
                        <div className="mt-4 mb-6 p-3 bg-white/5 border border-cyan-500/20 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">Item to delete:</p>
                            <p className="text-cyan-400 font-semibold truncate">
                                {itemName}
                            </p>
                        </div>
                    )}

                    <div className="mt-4 mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <p className="text-yellow-400 text-sm font-semibold flex items-center justify-center gap-2">
                            <FaTriangleExclamation /> This action cannot be undone!
                        </p>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-6 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Deleting...
                                </span>
                            ) : (
                                'Delete Forever'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
