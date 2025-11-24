'use client';

import Link from 'next/link';
import { FaXTwitter, FaDiscord, FaReddit, FaPalette, FaMagnifyingGlass, FaBolt, FaImage, FaHeart, FaShieldHalved, FaPenToSquare, FaRocket, FaGamepad, FaWandMagicSparkles, FaUser } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  const handleBrowseAssets = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/browse');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/* Hero Section */}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#050505]">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Vibrant Floating Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-semibold mb-8 animate-slide-up backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              The #1 Marketplace for Game Assets
            </div>

            <h1 className="mb-8 text-6xl md:text-7xl tracking-tight text-white">
              Build Epic Games with <br />
              <span className="gradient-text font-extrabold drop-shadow-lg">Premium Assets</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover thousands of high-quality 3D models, textures, sounds, and scripts.
              Join a community of <span className="font-semibold text-white">10,000+</span> creators building the future of gaming.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
              <button
                onClick={handleBrowseAssets}
                className="group relative px-8 py-4 text-lg font-bold text-white gradient-bg-primary rounded-2xl hover:opacity-90 transition-all shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Assets
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <Link
                href={isAuthenticated ? '/dashboard' : '/signup'}
                className="px-8 py-4 text-lg font-bold text-white border border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Creating'}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12 max-w-4xl mx-auto">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Assets', value: '50K+' },
                { label: 'Downloads', value: '1M+' },
                { label: 'Creators', value: '500+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-[#0a0a0a] relative">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="mb-6 text-4xl md:text-5xl text-white">Everything You Need</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A complete platform designed to streamline your game development workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaPalette,
                title: 'Diverse Asset Library',
                description: 'Access thousands of 3D models, textures, sounds, and scripts for your game projects.',
                color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              },
              {
                icon: FaMagnifyingGlass,
                title: 'Smart Search',
                description: 'Find exactly what you need with AI-powered search and advanced category filtering.',
                color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              },
              {
                icon: FaBolt,
                title: 'Instant Downloads',
                description: 'Quick and secure downloads with support for external links like Drive and itch.io.',
                color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              },
              {
                icon: FaImage,
                title: 'HD Previews',
                description: 'See what you\'re getting with interactive 3D viewers and high-quality image galleries.',
                color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              },
              {
                icon: FaHeart,
                title: 'Collections',
                description: 'Save your favorite assets and organize them into custom project boards.',
                color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
              },
              {
                icon: FaShieldHalved,
                title: 'Verified Quality',
                description: 'All assets are manually reviewed by our team to ensure top-tier quality and security.',
                color: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07]"
              >
                <div className={`w-14 h-14 ${feature.color} border rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <h2 className="mb-6 text-4xl md:text-5xl text-white">Choose Your Path</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're building games or creating assets, we have the perfect tools for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* User Role */}
            <div className="group bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 gradient-bg-secondary rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaUser className="text-4xl text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">For Developers</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Perfect for game developers looking for quality assets to bring their projects to life.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Download unlimited assets',
                  'Save favorites for later',
                  'Access curated collections',
                  'Get instant updates'
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href={isAuthenticated ? '/dashboard' : '/signup?role=developer'}
                className="block w-full py-4 text-center text-lg font-bold gradient-bg-secondary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Join as Developer'}
              </Link>
            </div>

            {/* Creator Role */}
            <div className="group bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

              <div className="w-20 h-20 gradient-bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <FaWandMagicSparkles className="text-4xl text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white relative z-10">For Creators</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed relative z-10">
                Share your work with the community and build your portfolio as an asset creator.
              </p>
              <ul className="space-y-4 mb-10 relative z-10">
                {[
                  'Upload your assets',
                  'Showcase your portfolio',
                  'Reach global audience',
                  'Build your reputation'
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href={isAuthenticated ? '/dashboard' : '/signup?role=creator'}
                className="relative z-10 block w-full py-4 text-center text-lg font-bold gradient-bg-primary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Join as Creator'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="mb-6 text-4xl md:text-5xl text-white">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {/* Connecting Line Background */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Sign up for free and choose your role—Developer or Creator.',
                icon: FaPenToSquare
              },
              {
                step: '02',
                title: 'Browse or Upload',
                description: 'Explore thousands of assets or share your own creations with the community.',
                icon: FaRocket
              },
              {
                step: '03',
                title: 'Download & Create',
                description: 'Get instant access to assets and start building amazing games.',
                icon: FaGamepad
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group z-10">
                <div className="w-24 h-24 mx-auto mb-8 bg-[#0a0a0a] rounded-full border-4 border-cyan-500/20 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/10 group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-300">
                  <step.icon className="text-3xl text-cyan-400" />
                </div>
                <div className="text-sm font-bold text-cyan-400 mb-3 tracking-wider">STEP {step.step}</div>
                <h3 className="mb-4 text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-black border-t border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-4xl md:text-6xl text-white font-bold">Ready to Start Building?</h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join thousands of game developers and creators sharing amazing assets today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href={isAuthenticated ? '/dashboard' : '/signup'}
                className="px-12 py-5 text-lg font-bold text-white gradient-bg-primary rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
              </Link>
              <Link
                href="/browse"
                className="px-12 py-5 text-lg font-bold text-white border border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                Explore Assets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
