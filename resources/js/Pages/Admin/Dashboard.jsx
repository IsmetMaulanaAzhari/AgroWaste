import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ stats, recentAttempts, modules }) {
    const passRate = stats.total_quiz_attempts > 0 
        ? Math.round((stats.passed_attempts / stats.total_quiz_attempts) * 100)
        : 0;

    return (
        <AdminLayout title="Dashboard - Admin Panel">
            <Head title="Dashboard - Admin Panel" />
            
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard icon="👥" label="Total Users" value={stats.total_users} />
                    <StatCard icon="📚" label="Total Modules" value={stats.total_modules} />
                    <StatCard icon="✅" label="Active Modules" value={stats.active_modules} />
                    <StatCard icon="🎬" label="Total Videos" value={stats.total_videos} />
                    <StatCard icon="📝" label="Total Quizzes" value={stats.total_quizzes} />
                    <StatCard icon="📊" label="Quiz Attempts" value={stats.total_quiz_attempts} />
                    <StatCard icon="✔️" label="Passed Attempts" value={stats.passed_attempts} />
                    <StatCard icon="📈" label="Pass Rate" value={`${passRate}%`} />
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <QuickActionCard 
                            icon="➕"
                            title="Add New Module"
                            description="Create a new learning module"
                            href={route('admin.modules.create')}
                            bgColor="bg-blue-50"
                        />
                        <QuickActionCard 
                            icon="🎬"
                            title="Add New Video"
                            description="Create video tutorial"
                            href={route('admin.videos.create')}
                            bgColor="bg-green-50"
                        />
                        <QuickActionCard 
                            icon="📝"
                            title="Add New Quiz"
                            description="Create quiz questions"
                            href={route('admin.quizzes.create')}
                            bgColor="bg-pink-50"
                        />
                        <QuickActionCard 
                            icon="📋"
                            title="Manage Content"
                            description="View and edit all content"
                            href={route('admin.modules.index')}
                            bgColor="bg-orange-50"
                        />
                    </div>
                </div>

                {/* Module Completion Statistics */}
                {modules && modules.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Module Completion Statistics</h2>
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Module</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Users</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Completed</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Completion Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {modules.map(module => {
                                        const completionRate = module.user_progress_count > 0
                                            ? Math.round((module.completed_count / module.user_progress_count) * 100)
                                            : 0;
                                        
                                        return (
                                            <tr key={module.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{module.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{module.user_progress_count}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{module.completed_count}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-12 bg-gray-200 rounded-full h-2">
                                                            <div 
                                                                className="bg-green-600 h-2 rounded-full" 
                                                                style={{ width: `${completionRate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span>{completionRate}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Recent Quiz Attempts */}
                {recentAttempts && recentAttempts.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Quiz Attempts</h2>
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Module</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentAttempts.map(attempt => (
                                        <tr key={attempt.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {attempt.user?.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {attempt.quiz?.module?.title || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {Math.round(attempt.score * 100) / 100}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    attempt.is_passed 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {attempt.is_passed ? 'Passed' : 'Failed'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(attempt.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-3xl">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {label}
                            </dt>
                            <dd className="text-2xl font-bold text-gray-900">
                                {value}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickActionCard({ icon, title, description, href, bgColor }) {
    return (
        <Link href={href} className={`${bgColor} p-4 rounded-lg hover:shadow-md transition-shadow`}>
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
        </Link>
    );
}
