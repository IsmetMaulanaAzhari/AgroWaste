import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminHome({ auth, totalModules, completedModules, modules, userProgress, stats }) {
    const { post } = useForm();

    const logout = () => {
        post(route('logout'));
    };

    return (
        <>
            <Head title="Admin Home - AgroWaste Admin" />
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gradient-to-b from-blue-700 to-blue-900 shadow-2xl">
                    <div className="flex items-center h-20 bg-blue-800 px-4 border-b border-blue-600">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl">🌱</span>
                            <div>
                                <h1 className="text-lg font-bold text-white">AgroWaste</h1>
                                <p className="text-xs text-blue-200">Admin Panel</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex flex-col h-full">
                        <div className="flex-1 px-3 mt-6">
                            <div className="space-y-2">
                                <Link 
                                    href={route('admin.home')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.home') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">🏠</span>
                                    Home
                                </Link>
                                <Link 
                                    href={route('admin.dashboard')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.dashboard') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">📊</span>
                                    Dashboard
                                </Link>
                                <Link 
                                    href={route('admin.modules.index')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.modules.*') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">📚</span>
                                    Modules
                                </Link>
                                <Link 
                                    href={route('admin.videos.index')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.videos.*') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">🎬</span>
                                    Videos
                                </Link>
                                <Link 
                                    href={route('admin.quizzes.index')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.quizzes.*') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">📝</span>
                                    Quizzes
                                </Link>
                                <Link 
                                    href={route('admin.users.index')} 
                                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${route().current('admin.users.*') ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                >
                                    <span className="mr-3 text-lg">👥</span>
                                    Users
                                </Link>
                            </div>
                        </div>
                        <div className="px-3 py-4 border-t border-blue-600">
                            <div className="bg-blue-600 bg-opacity-50 rounded-lg p-3 mb-4">
                                <p className="text-xs text-blue-100 font-medium mb-1">Role</p>
                                <p className="text-sm text-white font-semibold">{auth.user?.name || 'Administrator'}</p>
                            </div>
                            <button 
                                onClick={logout}
                                className="w-full text-left text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 lg:ml-64">
                    {/* Header */}
                    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                        <div className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Welcome, Admin! 👋</h2>
                                <p className="text-sm text-gray-600 mt-1">Here's what's happening with your platform</p>
                            </div>
                            <Link 
                                href={route('admin.dashboard')} 
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                📊 Go to Dashboard
                            </Link>
                        </div>
                    </header>

                    {/* Content */}
                    <main className="p-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                            <StatCard icon="👥" label="Total Users" value={stats.total_users} color="blue" />
                            <StatCard icon="📚" label="Modules" value={stats.total_modules} color="green" />
                            <StatCard icon="🎬" label="Videos" value={stats.total_videos} color="orange" />
                            <StatCard icon="📝" label="Quizzes" value={stats.total_quizzes} color="purple" />
                            <StatCard icon="📊" label="Quiz Attempts" value={stats.total_quiz_attempts} color="red" />
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <ActionCard 
                                    icon="➕"
                                    title="Add Module"
                                    description="Create new learning module"
                                    href={route('admin.modules.create')}
                                    color="blue"
                                />
                                <ActionCard 
                                    icon="🎬"
                                    title="Add Video"
                                    description="Create video tutorial"
                                    href={route('admin.videos.create')}
                                    color="green"
                                />
                                <ActionCard 
                                    icon="📝"
                                    title="Add Quiz"
                                    description="Create quiz questions"
                                    href={route('admin.quizzes.create')}
                                    color="purple"
                                />
                                <ActionCard 
                                    icon="👥"
                                    title="View Users"
                                    description="Manage platform users"
                                    href={route('admin.users.index')}
                                    color="orange"
                                />
                            </div>
                        </div>

                        {/* Platform Overview */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white">
                            <h3 className="text-2xl font-bold mb-2">AgroWaste Platform Overview</h3>
                            <p className="text-blue-100 mb-6">Manage your educational content and track user progress</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-3xl font-bold text-blue-200">{stats.total_users}</p>
                                    <p className="text-blue-100 text-sm">Active Users</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-blue-200">{stats.total_modules}</p>
                                    <p className="text-blue-100 text-sm">Learning Modules</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-blue-200">{Math.round((stats.passed_attempts / Math.max(stats.total_quiz_attempts, 1)) * 100)}%</p>
                                    <p className="text-blue-100 text-sm">Pass Rate</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-blue-200">{stats.total_quiz_attempts}</p>
                                    <p className="text-blue-100 text-sm">Quiz Attempts</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Platform Status</h3>
                                <Link 
                                    href={route('admin.dashboard')} 
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    View Full Dashboard →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                    <div className="text-4xl">✅</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Active Modules</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.active_modules}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                                    <div className="text-4xl">📊</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Completed Attempts</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.passed_attempts}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

function StatCard({ icon, label, value, color }) {
    const colorStyles = {
        blue: 'from-blue-50 to-blue-100 border-blue-200',
        green: 'from-green-50 to-green-100 border-green-200',
        orange: 'from-orange-50 to-orange-100 border-orange-200',
        purple: 'from-purple-50 to-purple-100 border-purple-200',
        red: 'from-red-50 to-red-100 border-red-200',
    };

    return (
        <div className={`bg-gradient-to-br ${colorStyles[color]} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className="text-4xl opacity-50">{icon}</div>
            </div>
        </div>
    );
}

function ActionCard({ icon, title, description, href, color }) {
    const colorStyles = {
        blue: 'border-blue-200 hover:bg-blue-50 hover:border-blue-300',
        green: 'border-green-200 hover:bg-green-50 hover:border-green-300',
        orange: 'border-orange-200 hover:bg-orange-50 hover:border-orange-300',
        purple: 'border-purple-200 hover:bg-purple-50 hover:border-purple-300',
    };

    return (
        <Link 
            href={href} 
            className={`border rounded-lg p-4 transition-all duration-200 ${colorStyles[color]} group`}
        >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
        </Link>
    );
}
