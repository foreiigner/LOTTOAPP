import { Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { LotteryTicket } from "@shared/schema";

interface LotteryCardProps {
  ticket: LotteryTicket;
  showDiscount?: boolean;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  className?: string;
}

export default function LotteryCard({ 
  ticket, 
  showDiscount = false, 
  isFavorite = false, 
  showFavoriteButton = false,
  className = ""
}: LotteryCardProps) {
  const [, navigate] = useLocation();
  const [favorite, setFavorite] = useState(isFavorite);
  
  const handleNavigateToDetails = () => {
    navigate(`/details/${ticket.id}`);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <div 
      className={`bg-gray-100 rounded-xl p-3 flex items-center ${className}`}
      onClick={handleNavigateToDetails}
    >
      {/* Lottery Logo */}
      <div className="w-14 h-14 rounded-full flex-shrink-0 bg-yellow-400 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-yellow-400 rounded-full">
              <div className="w-9 h-9 flex flex-col items-center justify-center">
                <div className="text-black text-xs font-bold -mb-1">NATIONAL</div>
                <div className="text-3xl font-black text-black leading-none">X</div>
                <div className="text-xs font-bold text-black -mt-1">LOTTERY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ticket Info */}
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="text-blue-600 text-sm font-medium">Potential wins</div>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            R{ticket.potentialWinnings}
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-sm font-bold">{ticket.type}</div>
          <div className="ml-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-700">{ticket.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">{ticket.status}</div>
          {showDiscount && ticket.discount && (
            <div className="bg-red-500 text-white px-2 py-0.5 rounded-md text-xs font-medium">
              -{ticket.discount}%
            </div>
          )}
          {showFavoriteButton && (
            <button onClick={toggleFavorite}>
              <Heart className={`h-5 w-5 ${favorite ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
