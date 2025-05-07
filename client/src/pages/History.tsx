import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "@/components/ui/icons";
import TicketsList from "@/components/lottery/TicketsList";

export default function History() {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['/api/tickets'],
  });

  return (
    <div>
      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center">
          <Link href="/" className="text-accent block">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">History</h1>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-green-100 rounded-xl p-3 flex items-center space-x-3">
            <div className="w-6 h-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium">Favorites</div>
              <div className="text-xs text-gray-500">Your list</div>
            </div>
          </div>
          
          <div className="bg-purple-100 rounded-xl p-3 flex items-center space-x-3">
            <div className="w-6 h-6 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium">My cards</div>
              <div className="text-xs text-gray-500">Live Tickets</div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="receipts" className="mb-6">
          <TabsList className="grid grid-cols-2 h-auto">
            <TabsTrigger value="receipts" className="py-3 px-4 text-sm font-medium">Payments recepts</TabsTrigger>
            <TabsTrigger value="statistics" className="py-3 px-4 text-sm font-medium">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="receipts" className="mt-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ) : tickets && tickets.length > 0 ? (
              <TicketsList tickets={tickets} />
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-orange-500" />
                </div>
                <p className="text-lg font-semibold mb-8">You haven't made any purchase yet!</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="statistics" className="mt-4">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-lg font-semibold mb-8">No statistics available yet!</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick Scan Button */}
        <Link href="/scanner" className="w-full bg-accent text-white font-semibold py-3 rounded-lg mt-4 block text-center">
          Quick scan&Go
        </Link>
      </div>
    </div>
  );
}
