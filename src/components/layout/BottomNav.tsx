
import { Home, BookOpen, Upload, User, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const BottomNav = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Don't show bottom nav on landing page
  const isLandingPage = location.pathname === "/" || location.pathname === "/landing";
  
  if (isLandingPage) {
    return null;
  }
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-spark-light shadow-lg z-50 dark:bg-card dark:border-muted">
      <div className="flex items-center justify-around h-16">
        <NavItem 
          icon={<Home size={20} />} 
          label="Home" 
          href="/dashboard" 
          active={location.pathname === '/dashboard'} 
        />
        <NavItem 
          icon={<BookOpen size={20} />} 
          label="Library" 
          href="/library" 
          active={location.pathname === '/library'} 
        />
        <NavItem 
          icon={<Upload size={20} />} 
          label="Upload" 
          href="/library" 
          active={false} 
        />
        <NavItem 
          icon={<User size={20} />} 
          label="Profile" 
          href="/profile" 
          active={location.pathname === '/profile'} 
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, href, active }) => {
  return (
    <Link to={href} className="flex flex-col items-center justify-center w-full py-1 animated-button">
      <div className={`p-1.5 ${active ? 'text-spark-primary' : 'text-muted-foreground dark:text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${active ? 'text-spark-primary font-medium' : 'text-muted-foreground dark:text-gray-400'}`}>
        {label}
      </span>
    </Link>
  );
};

export default BottomNav;
