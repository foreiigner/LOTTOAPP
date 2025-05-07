import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import LotteryCard from "@/components/lottery/LotteryCard";
import { 
  Ticket, 
  Wallet, 
  Search, 
  Star, 
  Mic, 
  PlusCircle,
  QrCode
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
  });
  
  const { data: promotions, isLoading: promotionsLoading } = useQuery({
    queryKey: ['/api/promotions'],
  });
  
  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['/api/tickets/weekly'],
  });
  
  return (
    <div className="pb-16">
      {/* Header with App Name */}
      <div className="bg-white pt-4 pb-2 px-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Lotto App</h1>
            <p className="text-gray-500">Welcome back!</p>
          </div>
          <div className="w-10 h-10">
            <img 
              src="/assets/app logo.png" 
              alt="32X Scanner Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      </div>
      
      {/* Jackpot Card */}
      <div className="px-5 mt-4">
        <div className="rounded-xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white">
          <p className="text-sm font-medium mb-1">This week's jackpot:</p>
          <h2 className="text-3xl font-bold mb-1">R12 Million</h2>
          <p className="text-xs opacity-80">Next draw: Friday at 8:00 PM</p>
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Scan Button */}
          <Link href="/scanner" className="no-underline">
            <Card className="bg-blue-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 text-blue-600">
                  <QrCode className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Scan</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Check Results Button */}
          <Link href="/history" className="no-underline">
            <Card className="bg-blue-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 text-blue-600">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Check Results</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* My Tickets Button */}
          <Link href="/saved-tickets" className="no-underline">
            <Card className="bg-blue-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 text-blue-600">
                  <Ticket className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">My Tickets</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          {/* Wallet Button */}
          <Link href="/payment" className="no-underline">
            <Card className="bg-blue-50 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 text-blue-600">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Wallet</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      

      
      {/* Search and Points Section */}
      <div className="px-5 mt-6">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center bg-white/20 rounded-lg p-2 mb-4">
                <Search className="text-white h-5 w-5 mr-2" />
                <input
                  type="text"
                  placeholder="Which Ticket are you looking for?"
                  className="bg-transparent border-none text-white placeholder-white/70 outline-none flex-1 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Mic className="text-white h-5 w-5 ml-2" />
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/80">Points</span>
                <span className="text-xs text-white/80">Account ID</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">
                  {userLoading ? "..." : user?.points || "1,764,598"}
                </span>
                <span className="text-sm font-medium text-white">
                  {userLoading ? "..." : user?.id || "876361900057"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Promotions Section */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-800">Promotions</h2>
          <Link href="/history" className="text-blue-600 text-sm">View all</Link>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto pb-4 -mx-1 px-1">
          {promotionsLoading ? (
            <div className="flex-shrink-0 w-36 h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          ) : (
            promotions?.map((promo: any) => (
              <div key={promo.id} className="flex-shrink-0 w-36 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative">
                  <img src={promo.image} alt={promo.title} className="w-full h-24 object-cover" />
                  {promo.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                      -{promo.discount}%
                    </Badge>
                  )}
                </div>
                <p className="p-2 text-sm font-medium">{promo.title}</p>
              </div>
            ))
          )}
          
          <div className="flex-shrink-0 w-36 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center h-32">
            <PlusCircle className="h-8 w-8 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Add new</span>
          </div>
        </div>
      </div>
      
      {/* Win of the Week Section */}
      <div className="px-5 mt-4">
        <div className="flex items-center mb-3">
          <h2 className="text-lg font-bold text-slate-800 mr-2">Win of the week</h2>
          <div className="w-8 h-8">
            <img 
              src="/assets/national lottery.webp" 
              alt="National Lottery Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {ticketsLoading ? (
          <div className="bg-gray-100 rounded-xl p-3 h-28 animate-pulse"></div>
        ) : (
          tickets && tickets.length > 0 && (
            <LotteryCard ticket={tickets[0]} showDiscount showFavoriteButton />
          )
        )}
      </div>
    </div>
  );
}
