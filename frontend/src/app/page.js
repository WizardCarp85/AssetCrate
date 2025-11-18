"use client";

import Link from "next/link";

export default function Home() {
  const assetExamples = [
    { icon: "🎭", title: "3D Models", description: "Characters, objects, and environments" },
    { icon: "🎨", title: "Textures", description: "High-quality textures and materials" },
    { icon: "🔊", title: "Audio & Sounds", description: "SFX, music, and voice assets" },
    { icon: "⚙️", title: "Scripts", description: "Game mechanics and code snippets" },
  ];

  const userFeatures = [
    "Browse thousands of game assets",
    "Advanced search and filtering",
    "Preview assets before downloading",
    "Download from external links",
    "Discover assets from talented creators",
  ];

  const creatorFeatures = [
    "Upload and share your own assets",
    "Organize your asset portfolio",
    "Add beautiful previews and descriptions",
    "Link to your Drive, itch.io, and more",
    "Reach a global community of developers",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white font-bold text-xl">AssetCrate</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white hover:text-blue-300 transition-colors font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 relative z-10">
            <span className="text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text">
              Find & Share
            </span>
            <br />
            <span className="text-white">Game Assets</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 relative z-10">
            Your hub for discovering and creating amazing game content
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 relative z-10 max-w-2xl mx-auto">
            Discover models, textures, sounds, and scripts 
            to bring your games to life, or showcase your creations to the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 mb-16">
            <Link
              href="/signup"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-lg"
            >
              Start Exploring
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold rounded-lg transition-all duration-200 text-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Asset Types Grid */}
          <div className="grid md:grid-cols-4 gap-4 relative z-10">
            {assetExamples.map((asset, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-200"
              >
                <div className="text-3xl mb-2">{asset.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{asset.title}</h3>
                <p className="text-sm text-gray-300">{asset.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Types Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text">
            Choose Your Role
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Developers */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-200">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="text-3xl font-bold text-white mb-4">For Developers</h3>
              <p className="text-gray-300 mb-6">
                Speed up your game development with quality assets from talented creators worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                {userFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="inline-block px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Join as Developer
              </Link>
            </div>

            {/* Creators */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-200">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-3xl font-bold text-white mb-4">For Creators</h3>
              <p className="text-gray-300 mb-6">
                Showcase your talents and build your portfolio with a global audience of developers.
              </p>
              <ul className="space-y-3 mb-8">
                {creatorFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="inline-block px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Assets Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text">
            Browse Asset Categories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assetExamples.map((asset, idx) => (
              <div
                key={idx}
                className="group bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 hover:from-white/30 transition-all duration-300 cursor-pointer"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{asset.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{asset.title}</h3>
                <p className="text-gray-300">{asset.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">Join thousands of developers and creators on AssetCrate</p>
            <Link
              href="/signup"
              className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-lg"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-white font-bold">AssetCrate</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your hub for discovering and sharing game assets
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>💬</span> Discord
                </a></li>
                <li><a href="https://reddit.com/r/gamedev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>🔗</span> Reddit
                </a></li>
                <li><a href="https://twitter.com/search?q=gamedev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>𝕏</span> Twitter
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <p className="text-gray-400 text-sm">
                AssetCrate connects game developers with talented creators worldwide to accelerate game development.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 AssetCrate. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ for game developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
