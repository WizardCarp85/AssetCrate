import Link from 'next/link';
import { FaXTwitter, FaDiscord, FaReddit } from 'react-icons/fa6';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">AssetCrate</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="#roles" className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                For Creators
              </Link>
              <Link href="#how-it-works" className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                How It Works
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 text-sm font-semibold text-white gradient-bg-primary rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Build Epic Games with <span className="gradient-text">Premium Assets</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The ultimate marketplace for game developers. Discover thousands of free, high-quality 3D models, textures, sounds, and scripts—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/browse"
                className="px-8 py-4 text-lg font-semibold text-white gradient-bg-primary rounded-full hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Browse Assets
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 text-lg font-semibold border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-all"
              >
                Start Creating
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete platform designed for game developers and asset creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Diverse Asset Library',
                description: 'Access thousands of 3D models, textures, sounds, and scripts for your game projects.'
              },
              {
                icon: '🔍',
                title: 'Smart Search & Filters',
                description: 'Find exactly what you need with powerful search and category filtering.'
              },
              {
                icon: '⚡',
                title: 'Instant Downloads',
                description: 'Quick and secure downloads with support for external links like Drive and itch.io.'
              },
              {
                icon: '🖼️',
                title: 'Image Previews',
                description: 'See what you\'re getting with high-quality preview images for every asset.'
              },
              {
                icon: '❤️',
                title: 'Favorites & Collections',
                description: 'Save your favorite assets and organize them into custom collections.'
              },
              {
                icon: '🛡️',
                title: 'Verified & Safe',
                description: 'All assets are reviewed and approved to ensure quality and security.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl hover-lift animate-slide-up border border-gray-200 shadow-md hover:shadow-xl transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for assets or sharing your creations, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* User Role */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover-lift border-2 border-gray-200 hover:border-purple-300 transition-all">
              <div className="w-16 h-16 gradient-bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="mb-4 text-gray-900">For Developers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Perfect for game developers looking for quality assets to bring their projects to life.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Download unlimited assets',
                  'Save favorites for later',
                  'Access curated collections',
                  'Get instant updates on new assets'
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?role=developer"
                className="block w-full py-3 text-center font-semibold gradient-bg-secondary text-white rounded-full hover:opacity-90 transition-opacity shadow-md"
              >
                Join as Developer
              </Link>
            </div>

            {/* Creator Role */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover-lift border-2 border-purple-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 gradient-bg-accent text-white text-xs font-bold rounded-full shadow-md">
                POPULAR
              </div>
              <div className="w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="mb-4 text-gray-900">For Creators</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Share your work with the community and build your portfolio as an asset creator.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Upload your assets',
                  'Showcase your portfolio',
                  'Reach thousands of developers',
                  'Build your reputation',
                  'Download assets from others'
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?role=creator"
                className="block w-full py-3 text-center font-semibold gradient-bg-primary text-white rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Sign up for free and choose your role—Developer or Creator.',
                icon: '📝'
              },
              {
                step: '02',
                title: 'Browse or Upload',
                description: 'Explore thousands of assets or share your own creations with the community.',
                icon: '🚀'
              },
              {
                step: '03',
                title: 'Download & Create',
                description: 'Get instant access to assets and start building amazing games.',
                icon: '🎮'
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 mx-auto mb-6 gradient-bg-primary rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-purple-600 mb-2">STEP {step.step}</div>
                <h3 className="mb-3 text-xl">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-primary opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join thousands of game developers and creators sharing amazing assets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-10 py-4 text-lg font-semibold text-white gradient-bg-primary rounded-full hover:opacity-90 transition-all shadow-xl hover:scale-105"
              >
                Create Free Account
              </Link>
              <Link
                href="/browse"
                className="px-10 py-4 text-lg font-semibold border-2 border-gray-300 rounded-full hover:border-purple-600 hover:text-purple-600 transition-all"
              >
                Explore Assets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold text-white">AssetCrate</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your trusted hub for discovering and sharing game assets.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/browse" className="hover:text-white transition-colors">Browse Assets</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/creators" className="hover:text-white transition-colors">Top Creators</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="#twitter"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#discord"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDiscord className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#reddit"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Reddit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaReddit className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 AssetCrate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
