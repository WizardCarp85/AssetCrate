'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaLocationDot, FaGlobe, FaXTwitter, FaDiscord, FaGithub, FaPenToSquare, FaCalendar, FaEnvelope, FaUserTag } from 'react-icons/fa6';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        website: '',
        socialLinks: {
            twitter: '',
            discord: '',
            github: ''
        }
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchProfile(parsedUser.id);
    };

    const fetchProfile = async (userId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${userId}`);
            const data = await res.json();

            if (data.success) {
                setUser(data.data);
                setFormData({
                    bio: data.data.bio || '',
                    location: data.data.location || '',
                    website: data.data.website || '',
                    socialLinks: data.data.socialLinks || { twitter: '', discord: '', github: '' }
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setUser(data.data);
                setIsEditing(false);
                localStorage.setItem('user', JSON.stringify(data.data));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 animate-pulse text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container-custom relative z-10 max-w-5xl">
                <div className="bg-linear-to-br from-[#111]/90 to-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 mb-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-32 h-32 rounded-full gradient-bg-primary p-1">
                                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{getInitials(user.username)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grow text-center md:text-left">
                            <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <FaEnvelope className="text-sm" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${user.role === 'creator'
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        }`}>
                                        <FaUserTag className="inline mr-1" />
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                                <FaCalendar />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${isEditing
                                ? 'bg-gray-600 text-white hover:bg-gray-700'
                                : 'gradient-bg-primary text-white hover:opacity-90 shadow-lg shadow-cyan-500/30'
                                }`}
                        >
                            <FaPenToSquare />
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

=                <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>

                    {isEditing ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    maxLength={500}
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                />
                                <div className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="City, Country"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Website</label>
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="https://yourwebsite.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-4">Social Links</label>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <FaXTwitter />
                                            <span className="text-sm">Twitter</span>
                                        </div>
                                        <input
                                            type="url"
                                            value={formData.socialLinks.twitter}
                                            onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                                            placeholder="https://twitter.com/..."
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <FaDiscord />
                                            <span className="text-sm">Discord</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.socialLinks.discord}
                                            onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, discord: e.target.value } })}
                                            placeholder="username#1234"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <FaGithub />
                                            <span className="text-sm">GitHub</span>
                                        </div>
                                        <input
                                            type="url"
                                            value={formData.socialLinks.github}
                                            onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                                            placeholder="https://github.com/..."
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleUpdate}
                                className="w-full md:w-auto px-8 py-3 gradient-bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/30"
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {user.bio ? (
                                <div>
                                    <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No bio added yet.</p>
                            )}

                            <div className="flex flex-wrap gap-6">
                                {user.location && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <FaLocationDot className="text-cyan-400" />
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                {user.website && (
                                    <a
                                        href={user.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        <FaGlobe />
                                        <span>{user.website.replace(/^https?:\/\//, '')}</span>
                                    </a>
                                )}
                            </div>

                            {(user.socialLinks?.twitter || user.socialLinks?.discord || user.socialLinks?.github) && (
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    {user.socialLinks.twitter && (
                                        <a
                                            href={user.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                                        >
                                            <FaXTwitter />
                                        </a>
                                    )}
                                    {user.socialLinks.discord && (
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-gray-400">
                                            <FaDiscord />
                                            <span className="text-sm">{user.socialLinks.discord}</span>
                                        </div>
                                    )}
                                    {user.socialLinks.github && (
                                        <a
                                            href={user.socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                                        >
                                            <FaGithub />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
