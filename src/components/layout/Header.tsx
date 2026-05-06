import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { Menu, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              SafeRecovery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              Insights
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              Contact
            </Link>
            {user && (
              <Link to="/admin" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-semibold text-slate-700">
                    <User className="w-4 h-4 mr-2" />
                    Demo Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-slate-600 font-medium py-3">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-rose-600 font-medium py-3">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-semibold text-slate-700">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="font-semibold px-6 shadow-lg shadow-primary/20">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6 bg-white absolute top-full left-0 right-0 px-4 border-b border-slate-200 shadow-xl">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className="text-lg font-semibold text-slate-700 py-2 border-b border-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="text-lg font-semibold text-slate-700 py-2 border-b border-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Link
                to="/contact"
                className="text-lg font-semibold text-slate-700 py-2 border-b border-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/admin"
                  className="text-lg font-semibold text-slate-700 py-2 border-b border-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <Button variant="outline" onClick={signOut} className="w-full justify-center mt-4 border-rose-200 text-rose-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col space-y-3 mt-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full shadow-lg shadow-primary/20">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};