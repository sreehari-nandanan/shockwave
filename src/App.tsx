import React, { useState, useEffect } from 'react';
import { EventProvider } from './context/EventContext';
import { CircuitBackground } from './components/CircuitBackground';

// 13 Dedicated Competition Routes
import { LandingPage } from './pages/LandingPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';               // Legacy (kept for /login)
import { ParticipantLogin } from './pages/ParticipantLogin'; // NEW: /participant/login
import { ControlLogin } from './pages/ControlLogin';         // NEW: /control/login
import { TeamDashboard } from './pages/TeamDashboard';
import { TeamCrossfirePage } from './pages/TeamCrossfirePage';
import { CrossfireArena } from './pages/CrossfireArena';
import { AdminDashboard } from './pages/AdminDashboard';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProjectorDisplay } from './pages/ProjectorDisplay';
import { HowItWorksPage } from './pages/HowItWorksPage';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return hash ? hash : (window.location.pathname || '/');
    }
    return '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the specific page based on path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '':
        return <LandingPage navigate={navigate} />;
      case '/register':
        return <RegistrationPage navigate={navigate} />;

      // --- DUAL AUTH PORTALS ---
      case '/participant/login':
        return <ParticipantLogin navigate={navigate} />;
      case '/control/login':
        return <ControlLogin navigate={navigate} />;

      // Legacy login route → redirect to participant portal
      case '/login':
        return <ParticipantLogin navigate={navigate} />;

      // --- PROTECTED TEAM ROUTES ---
      case '/team':
        return <TeamDashboard navigate={navigate} />;

      // --- PUBLIC VIEWS ---
      case '/crossfire':
        return <CrossfireArena navigate={navigate} />;
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/display':
        return <ProjectorDisplay navigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage navigate={navigate} />;

      // --- CONTROL ROOM ROUTES ---
      case '/admin':
        return <AdminDashboard />;

      default:
        return <LandingPage navigate={navigate} />;
    }
  };

  // Full-screen layouts that override the shell completely
  const isFullScreen = currentPath === '/' ||
    currentPath === '' ||
    currentPath === '/display' ||
    currentPath === '/participant/login' ||
    currentPath === '/control/login';

  // Display mode also hides navbar
  const isDisplayMode = currentPath === '/display';

  if (isFullScreen && !isDisplayMode) {
    // Participant & Control login pages get their own full-screen layout
    return (
      <div className="relative">
        {/* Subtle Circuit Background */}
        <CircuitBackground />
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080D] text-slate-100 flex flex-col relative selection:bg-[#00F0FF] selection:text-black">
      {/* Subtle Circuit Background Graphic */}
      <CircuitBackground />

      {/* Main View Area */}
      <main className="flex-1 relative z-10">
        {renderPage()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}
