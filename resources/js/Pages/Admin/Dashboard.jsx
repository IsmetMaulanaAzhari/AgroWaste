import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent } from "@/Components/ui/card";
import {
    UsersIcon,
    BookOpenIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    CheckCircleIcon,
    ClockIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ stats = {}, recentModules = [], activityData = { dates: [], videoViews: [], quizCompletions: [] } }) {
    const statCards = [
        {
            title: "Total Pengguna",
            value: stats.totalUsers || 0,
            icon: UsersIcon,
            color: "bg-blue-500",
            change: "+12% minggu ini"
        },
        {
            title: "Total Modul",
            value: stats.totalModules || 0,
            icon: BookOpenIcon,
            color: "bg-emerald-500",
            change: (stats.totalModules || 0) + " modul aktif"
        },
        {
            title: "Total Video",
            value: stats.totalVideos || 0,
            icon: VideoCameraIcon,
            color: "bg-purple-500",
            change: stats.totalModules ? Math.round(stats.totalVideos / stats.totalModules) + " rata-rata per modul" : "0 rata-rata per modul"
        },
        {
            title: "Total Kuis",
            value: stats.totalQuizzes || 0,
            icon: DocumentTextIcon,
            color: "bg-amber-500",
            change: stats.totalModules ? Math.round(stats.totalQuizzes / stats.totalModules) + " rata-rata per modul" : "0 rata-rata per modul"
        },
    ];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    const chartData = {
        labels: activityData.dates,
        datasets: [
            {
                label: 'Video Ditonton',
                data: activityData.videoViews,
                backgroundColor: 'rgba(147, 51, 234, 0.5)',
                borderColor: 'rgb(147, 51, 234)',
                borderWidth: 1
            },
            {
                label: 'Kuis Diselesaikan',
                data: activityData.quizCompletions,
                backgroundColor: 'rgba(245, 158, 11, 0.5)',
                borderColor: 'rgb(245, 158, 11)',
                borderWidth: 1
            },
        ],
    };

    return (
        <>
            <Head title="Dashboard Admin" />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <ClockIcon className="h-5 w-5" />
                            Data diperbarui pada {new Date().toLocaleString('id-ID')}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat) => (
                            <Card key={stat.title}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {stat.title}
                                            </p>
                                            <p className="text-2xl font-semibold mt-1">
                                                {stat.value}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {stat.change}
                                            </p>
                                        </div>
                                        <div className={`${stat.color} p-3 rounded-lg`}>
                                            <stat.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Activity Chart */}
                        <Card className="lg:col-span-2">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">
                                        Aktivitas Pengguna
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                        7 hari terakhir
                                    </div>
                                </div>
                                <Bar options={chartOptions} data={chartData} />
                            </CardContent>
                        </Card>

                        {/* Recent Activities & Modules */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Aktivitas Terkini
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg">
                                        <CheckCircleIcon className="h-8 w-8 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium">3 pengguna baru menyelesaikan kuis</p>
                                            <p className="text-xs mt-0.5">5 menit yang lalu</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg">
                                        <VideoCameraIcon className="h-8 w-8 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium">10 video baru ditonton</p>
                                            <p className="text-xs mt-0.5">15 menit yang lalu</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg">
                                        <UserGroupIcon className="h-8 w-8 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium">5 pengguna baru mendaftar</p>
                                            <p className="text-xs mt-0.5">1 jam yang lalu</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                                        Modul Terbaru
                                    </h3>
                                    <div className="space-y-3">
                                        {recentModules.map((module) => (
                                            <div 
                                                key={module.id}
                                                className="flex items-center p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="h-8 w-8 rounded bg-emerald-100 flex items-center justify-center">
                                                    <AcademicCapIcon className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="text-sm font-medium">
                                                        {module.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {module.videos_count} Video • {module.quizzes_count} Kuis
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}