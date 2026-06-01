// src/pages/Home.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    Briefcase,
    FileText,
    Calendar,
    LineChart,
    ArrowRight,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';

const features = [
    {
        icon: FileText,
        title: 'Track Applications',
        description: 'Keep every job application organized in one place with status, location, and next steps.',
        accent: 'from-blue-500 to-indigo-500',
    },
    {
        icon: Calendar,
        title: 'Manage Interviews',
        description: 'Schedule interviews, log interviewers and platforms, and never miss a follow-up.',
        accent: 'from-violet-500 to-purple-500',
    },
    {
        icon: LineChart,
        title: 'Track Progress',
        description: 'Visualize your job-search momentum with live stats and an activity timeline.',
        accent: 'from-emerald-500 to-teal-500',
    },
];

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/40 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
            </div>

            {/* Top bar */}
            <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow">
                        <Briefcase className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-bold tracking-tight">TrackWise</span>
                </div>
                {!user ? (
                    <div className="flex items-center gap-2">
                        <Link
                            to="/login"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-glow active:scale-[0.97]"
                        >
                            Sign up
                        </Link>
                    </div>
                ) : (
                    <Link
                        to="/dashboard"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-glow active:scale-[0.97]"
                    >
                        Go to Dashboard
                    </Link>
                )}
            </header>

            {/* Hero */}
            <section className="mx-auto max-w-3xl px-6 pb-8 pt-16 text-center md:pt-24">
                <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-soft backdrop-blur">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    Your job search, beautifully organized
                </div>

                <h1
                    className="animate-fade-up text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl"
                    style={{ animationDelay: '60ms' }}
                >
                    Land your next role with{' '}
                    <span className="text-gradient">TrackWise</span>
                </h1>

                <p
                    className="mx-auto mt-6 max-w-xl animate-fade-up text-lg text-muted-foreground"
                    style={{ animationDelay: '120ms' }}
                >
                    Track applications, schedule interviews, and visualize your progress —
                    all in one focused dashboard built for serious job seekers.
                </p>

                <div
                    className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
                    style={{ animationDelay: '180ms' }}
                >
                    {!user ? (
                        <>
                            <button
                                onClick={() => navigate('/register')}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
                            >
                                Get started free
                                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex w-full items-center justify-center rounded-xl border bg-card px-7 py-3.5 text-base font-semibold text-foreground shadow-soft transition-all duration-200 hover:bg-muted active:scale-[0.98] sm:w-auto"
                            >
                                Log in
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                        >
                            Go to your dashboard
                            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                    )}
                </div>

                <p
                    className="mt-5 flex animate-fade-up items-center justify-center gap-1.5 text-sm text-muted-foreground"
                    style={{ animationDelay: '220ms' }}
                >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Free to use · No credit card required
                </p>
            </section>

            {/* Feature cards */}
            <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="group animate-fade-up rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                                style={{ animationDelay: `${300 + i * 80}ms` }}
                            >
                                <div
                                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA banner */}
                {!user && (
                    <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-12 text-center shadow-glow">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">
                            Ready to take control of your job search?
                        </h2>
                        <p className="mx-auto mt-3 max-w-lg text-indigo-100">
                            Join job seekers who stay organized and land offers faster with TrackWise.
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition-all duration-200 hover:bg-indigo-50 active:scale-[0.98]"
                        >
                            Create your free account
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-indigo-500" />
                        <span className="font-semibold text-foreground">TrackWise</span>
                    </div>
                    <p>© {new Date().getFullYear()} TrackWise. Built for job seekers.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
