import Link from 'next/link';
import { FaXTwitter, FaDiscord, FaReddit } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-12 border-t border-white/10">
            <div className="container-custom">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="text-xl font-bold text-white">AssetCrate</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Your trusted hub for discovering and sharing game assets.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/browse" className="hover:text-cyan-400 transition-colors">Browse Assets</Link></li>
                            <li><Link href="/categories" className="hover:text-cyan-400 transition-colors">Categories</Link></li>
                            <li><Link href="/creators" className="hover:text-cyan-400 transition-colors">Top Creators</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
                            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="#twitter"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all"
                                aria-label="Twitter"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaXTwitter className="w-5 h-5 text-white" />
                            </a>
                            <a
                                href="#discord"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all"
                                aria-label="Discord"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDiscord className="w-5 h-5 text-white" />
                            </a>
                            <a
                                href="#reddit"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all"
                                aria-label="Reddit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaReddit className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; 2025 AssetCrate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
