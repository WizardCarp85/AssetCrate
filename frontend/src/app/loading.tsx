export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
            <div className="relative flex flex-col items-center">
                {/* Animated Logo */}
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-cyan-600/20 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative w-full h-full gradient-bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 animate-bounce-slight">
                        <span className="text-white font-bold text-5xl animate-pulse">A</span>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-loading-bar"></div>
                </div>

                <p className="mt-4 text-gray-400 text-sm font-medium animate-pulse">Loading AssetCrate...</p>
            </div>
        </div>
    );
}
