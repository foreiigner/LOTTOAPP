import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import LotteryCard from "@/components/lottery/LotteryCard";

export default function Details() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: ticket, isLoading } = useQuery({
    queryKey: ['/api/tickets', id],
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div>
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-accent">
                <ChevronLeft className="h-6 w-6" />
              </a>
            </Link>
            <h1 className="text-xl font-bold flex-1 text-center">Details</h1>
          </div>
        </div>
        <div className="px-4">
          <div className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-2"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div>
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-accent">
                <ChevronLeft className="h-6 w-6" />
              </a>
            </Link>
            <h1 className="text-xl font-bold flex-1 text-center">Details</h1>
          </div>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-lg font-medium text-gray-500">Ticket not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center">
          <Link href="/" className="text-accent block">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Details</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4">
        {/* Lottery Card */}
        <LotteryCard ticket={ticket} showDiscount className="mb-4" />
        
        {/* Lottery News */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">{ticket.title}</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">{ticket.points} pts</div>
            <div className="flex space-x-4 items-center">
              <div className="text-sm text-gray-500">{ticket.available} Available</div>
              <button onClick={toggleFavorite}>
                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Scan Button */}
        <Link href="/scanner" className="w-full bg-accent text-white font-semibold py-3 rounded-lg mb-6 block text-center">
          Quick scan&Go
        </Link>
      </div>
    </div>
  );
}
