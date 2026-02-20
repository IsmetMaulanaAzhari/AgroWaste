import { Link } from "@inertiajs/react";
import { 
    HomeIcon, 
    AcademicCapIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Dashboard', href: route('admin.dashboard'), icon: HomeIcon },
    { name: 'Manajemen Pembelajaran', href: route('admin.learning.index'), icon: AcademicCapIcon },
    { name: 'Pengguna', href: route('admin.users.index'), icon: UserGroupIcon },
    { name: 'Statistik', href: route('admin.stats'), icon: ChartBarIcon },
    { name: 'Pengaturan', href: route('admin.settings'), icon: Cog6ToothIcon },
];

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full bg-white border-r">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b">
                <span className="text-xl font-bold text-emerald-600">
                    AgroEdu Admin
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = route().current(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center px-4 py-3 text-sm rounded-lg
                                ${isActive
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            <item.icon className={`
                                h-5 w-5 mr-3
                                ${isActive ? 'text-emerald-600' : 'text-gray-400'}
                            `} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="inline-block h-8 w-8 rounded-full bg-gray-200" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Admin</p>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}