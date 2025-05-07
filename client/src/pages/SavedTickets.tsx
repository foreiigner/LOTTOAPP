import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import TicketsList from "@/components/lottery/TicketsList";

export default function SavedTickets() {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['/api/tickets/saved'],
  });
  
  const { data: totalWinnings, isLoading: winningsLoading } = useQuery({
    queryKey: ['/api/tickets/winnings'],
  });

  return (
    <div>
      {/* Header Section */}
      <div className="px-4 pt-2 pb-4 text-center">
        <h1 className="text-xl font-bold mb-4">Scan&Save</h1>
        
        {/* Barcode Display */}
        <div className="bg-amber-50 rounded-lg p-4 mb-3">
          <div className="bg-white p-3 rounded border border-gray-300 mx-auto max-w-xs mb-1">
            {/* Barcode SVG */}
            <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <rect x="10" y="10" width="2" height="60" />
              <rect x="15" y="10" width="1" height="60" />
              <rect x="20" y="10" width="3" height="60" />
              <rect x="25" y="10" width="1" height="60" />
              <rect x="30" y="10" width="2" height="60" />
              <rect x="35" y="10" width="3" height="60" />
              <rect x="42" y="10" width="1" height="60" />
              <rect x="48" y="10" width="2" height="60" />
              <rect x="53" y="10" width="3" height="60" />
              <rect x="60" y="10" width="2" height="60" />
              <rect x="65" y="10" width="1" height="60" />
              <rect x="70" y="10" width="1" height="60" />
              <rect x="75" y="10" width="3" height="60" />
              <rect x="82" y="10" width="2" height="60" />
              <rect x="87" y="10" width="1" height="60" />
              <rect x="92" y="10" width="3" height="60" />
              <rect x="100" y="10" width="1" height="60" />
              <rect x="105" y="10" width="3" height="60" />
              <rect x="112" y="10" width="2" height="60" />
              <rect x="117" y="10" width="1" height="60" />
              <rect x="122" y="10" width="3" height="60" />
              <rect x="130" y="10" width="2" height="60" />
              <rect x="135" y="10" width="1" height="60" />
              <rect x="140" y="10" width="2" height="60" />
              <rect x="145" y="10" width="3" height="60" />
              <rect x="152" y="10" width="1" height="60" />
              <rect x="157" y="10" width="2" height="60" />
              <rect x="162" y="10" width="1" height="60" />
              <rect x="167" y="10" width="2" height="60" />
              <rect x="172" y="10" width="3" height="60" />
              <rect x="180" y="10" width="1" height="60" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Saved Tickets List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Saved Tickets</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span>Sorted by Dates</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Tickets List */}
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <TicketsList tickets={tickets || []} />
        )}
        
        {/* Total Wins */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 mb-6 mt-4">
          <h3 className="text-lg font-bold">Total wins</h3>
          <div className="text-lg font-bold">
            R{winningsLoading ? "..." : totalWinnings || "0"}
          </div>
        </div>
        
        {/* Scan Button */}
        <Link href="/scanner" className="w-full bg-accent text-white font-semibold py-3 rounded-lg mb-6 block text-center">
          Scan Ticket & Save
        </Link>
      </div>
    </div>
  );
}
