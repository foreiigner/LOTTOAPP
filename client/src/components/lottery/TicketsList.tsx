import { LotteryTicket } from "@shared/schema";
import LotteryCard from "./LotteryCard";

interface TicketsListProps {
  tickets: LotteryTicket[];
  showDiscount?: boolean;
  showFavoriteButton?: boolean;
}

export default function TicketsList({ 
  tickets,
  showDiscount = false,
  showFavoriteButton = false
}: TicketsListProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p className="text-lg font-semibold mb-8">You haven't made any purchase yet!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <LotteryCard 
          key={ticket.id} 
          ticket={ticket} 
          showDiscount={showDiscount} 
          showFavoriteButton={showFavoriteButton}
        />
      ))}
    </div>
  );
}
