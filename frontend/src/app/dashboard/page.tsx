'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeveloperDashboard from '@/components/Dashboard/DeveloperDashboard';
import CreatorDashboard from '@/components/Dashboard/CreatorDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 animate-pulse text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            {user.role === 'developer' && <DeveloperDashboard />}
            {user.role === 'creator' && <CreatorDashboard />}
            {user.role === 'admin' && <AdminDashboard />}
        </>
    );
}
