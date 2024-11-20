import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    User,
    LogOut,
    Menu
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth'; // Update path as needed
import { Button } from '../ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../ui/sheet";

const RootLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navigationItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
            name: 'Applications',
            path: '/applications',
            icon: <FileText className="h-5 w-5" />
        },
        {
            name: 'Interviews',
            path: '/interviews',
            icon: <Calendar className="h-5 w-5" />
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <User className="h-5 w-5" />
        }
    ];

    const NavLink = ({ item }) => (
        <Link
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
        >
            {item.icon}
            <span>{item.name}</span>
        </Link>
    );

    const NavContent = () => (
        <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
                <NavLink key={item.name} item={item} />
            ))}
            <Button
                variant="ghost"
                className="justify-start px-3"
                onClick={handleLogout}
            >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 border-r p-6">
                <div className="flex items-center space-x-2 mb-8">
                    <FileText className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Job Tracker</h1>
                </div>
                <NavContent />
            </aside>
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Job Tracker</h1>
                </div>
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <div className="flex flex-col space-y-8 mt-6">
                            <NavContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            {/* Main Content */}
            <main className="lg:pl-64 pt-0 lg:pt-0">
                <div className="container mx-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default RootLayout;