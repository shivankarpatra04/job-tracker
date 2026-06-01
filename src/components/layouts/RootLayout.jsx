import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    User,
    LogOut,
    Menu,
    Briefcase
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth'; // Update path as needed
import { Button } from '../ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../ui/sheet";

const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: FileText },
    { name: 'Interviews', path: '/interviews', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: User },
];

const Brand = () => (
    <Link to="/dashboard" className="flex items-center gap-2.5 group">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow transition-transform duration-200 group-hover:scale-105">
            <Briefcase className="h-5 w-5" />
        </span>
        <span className="text-lg font-bold tracking-tight">TrackWise</span>
    </Link>
);

const RootLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const NavLink = ({ item, onClick }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
            <Link
                to={item.path}
                onClick={onClick}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
            >
                {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span>{item.name}</span>
            </Link>
        );
    };

    const NavContent = ({ onNavigate }) => (
        <div className="flex h-full flex-col">
            <nav className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                    <NavLink key={item.name} item={item} onClick={onNavigate} />
                ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6">
                {user && (
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white">
                            {(user.firstName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Your account'}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                )}
                <Button
                    variant="ghost"
                    className="w-full justify-start px-3 text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-card/80 p-5 backdrop-blur-sm lg:flex">
                <div className="mb-8 px-1">
                    <Brand />
                </div>
                <NavContent />
            </aside>

            {/* Mobile Header */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur-md lg:hidden">
                <Brand />
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-5">
                        <div className="mb-8 mt-1">
                            <Brand />
                        </div>
                        <div className="h-[calc(100%-4rem)]">
                            <NavContent onNavigate={() => setIsMobileMenuOpen(false)} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="lg:pl-64">
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default RootLayout;
