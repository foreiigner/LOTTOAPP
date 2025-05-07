import { useLocation, Link } from "wouter";
import { Home, QrCode, Wallet, User } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pt-1 pb-5 max-w-md mx-auto">
      <div className="flex justify-around items-center">
        <Link href="/" className={`bottom-tab flex flex-col items-center w-1/4 ${isActive("/") ? "text-accent" : "text-gray-500"}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="/scanner" className={`bottom-tab flex flex-col items-center w-1/4 ${isActive("/scanner") ? "text-accent" : "text-gray-500"}`}>
          <QrCode className="h-6 w-6" />
          <span className="text-xs mt-1">Scan</span>
        </Link>
        
        <Link href="/payment" className={`bottom-tab flex flex-col items-center w-1/4 ${isActive("/payment") ? "text-accent" : "text-gray-500"}`}>
          <Wallet className="h-6 w-6" />
          <span className="text-xs mt-1">Wallet</span>
        </Link>
        
        <Link href="/profile" className={`bottom-tab flex flex-col items-center w-1/4 ${isActive("/profile") ? "text-accent" : "text-gray-500"}`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}
