import { Home, FileText, Bell, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: FileText, label: "Prescriptions", path: "/results" },
    { icon: Bell, label: "Reminders", path: "/reminders" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 h-full smooth-transition text-muted-foreground hover:text-primary"
            activeClassName="text-primary font-medium"
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
