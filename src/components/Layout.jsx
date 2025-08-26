import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, LogOut, Moon, Sun, UserCircle, Home, Users, BarChart3, FileText, BookOpen, Settings, LifeBuoy, FolderOpen, UserSquare } from 'lucide-react';
import { useTheme } from '@/components/theme/theme-provider';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/#patients', label: 'Pacientes', icon: UserSquare },
  { href: '/reports', label: 'Relatórios', icon: BarChart3 },
  { href: '/resources', label: 'Recursos', icon: BookOpen },
  { href: '/media-manager', label: 'Gerenciar Mídia', icon: FolderOpen },
  { href: '/manage-therapists', label: 'Terapeutas', icon: Users },
  { href: '/user-guide', label: 'Guia de Uso', icon: LifeBuoy },
];

const SidebarNavLink = ({ to, children, icon: Icon, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 ease-in-out",
        "text-slate-300 hover:bg-purple-700 hover:text-white",
        isActive && "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <Icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
      {!isCollapsed && <span className="text-sm font-medium">{children}</span>}
    </NavLink>
  );
};


const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const sidebarVariants = {
    open: { width: '260px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    collapsed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const contentVariants = {
    open: { marginLeft: '260px', width: 'calc(100% - 260px)', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    collapsed: { marginLeft: '80px', width: 'calc(100% - 80px)', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "collapsed"}
        variants={sidebarVariants}
        className="hidden md:flex flex-col bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800 text-white shadow-2xl fixed h-full z-20"
      >
        <div className={cn("p-4 flex items-center border-b border-slate-700", isSidebarOpen ? "justify-between" : "justify-center")}>
          {isSidebarOpen && (
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/f9c256f6-ea15-437b-9c07-58682ae75567/7f5208d137c5140d6c082f75b2a2091b.png" alt="Lumina Restauris Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Lumina</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-white hover:bg-purple-700">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-grow p-3 space-y-2">
          {navItems.map(item => (
            <SidebarNavLink key={item.label} to={item.href} icon={item.icon} isCollapsed={!isSidebarOpen}>
              {item.label}
            </SidebarNavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 space-y-2">
           <div className={cn("flex items-center text-slate-300", isSidebarOpen ? "justify-start" : "justify-center")}>
            <UserCircle className={cn("h-8 w-8 text-purple-400", isSidebarOpen ? "mr-2" : "")} />
            {isSidebarOpen && (
              <div className="text-xs">
                <p className="font-semibold">{user?.user_metadata?.name || user?.email}</p>
                <p className="text-slate-400">{user?.user_metadata?.role || 'Terapeuta'}</p>
              </div>
            )}
          </div>
          <Button variant="ghost" onClick={handleLogout} className={cn("w-full text-slate-300 hover:bg-red-600 hover:text-white", isSidebarOpen ? "justify-start" : "justify-center")}>
            <LogOut className={cn("h-5 w-5", isSidebarOpen ? "mr-3" : "")} />
            {isSidebarOpen && <span className="text-sm">Sair</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Header & Menu */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-slate-800 text-white shadow-lg">
        <Link to="/" className="flex items-center space-x-2">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/f9c256f6-ea15-437b-9c07-58682ae75567/7f5208d137c5140d6c082f75b2a2091b.png" alt="Lumina Restauris Logo" className="h-8 w-auto" />
          <span className="text-lg font-bold">Lumina</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-slate-300 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-slate-800 text-white p-0 flex flex-col">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <span className="text-lg font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-grow p-3 space-y-1.5">
                {navItems.map(item => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-purple-700 hover:text-white",
                        isActive && "bg-purple-600 text-white"
                      )
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-700 space-y-2">
                <div className="flex items-center text-slate-300">
                  <UserCircle className="h-7 w-7 mr-2 text-purple-400" />
                  <div className="text-xs">
                    <p className="font-semibold">{user?.user_metadata?.name || user?.email}</p>
                    <p className="text-slate-400">{user?.user_metadata?.role || 'Terapeuta'}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-slate-300 hover:bg-red-600 hover:text-white">
                  <LogOut className="mr-3 h-5 w-5" /> Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Main Content Area */}
      <motion.main
        initial={false}
        animate={isSidebarOpen ? "open" : "collapsed"}
        variants={contentVariants}
        className="flex-1 overflow-y-auto md:ml-[80px] pt-20 md:pt-6 pb-6 px-4 md:px-8 flex flex-col"
      >
        <div className="hidden md:flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-foreground"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
        </div>
        <AnimatePresence mode="wait">
          {React.cloneElement(children, { key: location.pathname })}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Desenvolvido por Mestre Ricardo - 2025 - todos os Direitos reservados.
        </footer>
      </motion.main>
    </div>
  );
};

export default Layout;