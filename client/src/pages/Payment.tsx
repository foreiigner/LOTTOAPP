import { useState } from "react";
import { ChevronLeft, CreditCard, PlusCircle, Trash2, QrCode } from "lucide-react";
import { Link } from "wouter";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Payment() {
  const [printCheck, setPrintCheck] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
  });

  // Mock bank card data
  const bankCards = [
    {
      id: 1,
      type: "VISA",
      number: "**** **** **** 4895",
      expires: "02/28",
      bank: "NEDBANK",
      color: "bg-gradient-to-r from-green-500 to-emerald-700"
    },
    {
      id: 2,
      type: "MASTERCARD",
      number: "**** **** **** 2359",
      expires: "11/25",
      bank: "STANDARD BANK",
      color: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      id: 3,
      type: "VISA",
      number: "**** **** **** 7732",
      expires: "09/26",
      bank: "FIRST NATIONAL BANK",
      color: "bg-gradient-to-r from-gray-800 to-gray-900"
    }
  ];
  
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center">
          <Link href="/" className="text-accent block">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Finance</h1>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="cards" className="w-full mb-4">
        <div className="px-4 mb-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="cards">My Cards</TabsTrigger>
            <TabsTrigger value="qr">QR Payment</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Cards Tab Content */}
        <TabsContent value="cards" className="mt-0">
          <div className="px-4">
            {/* Cards Carousel */}
            <div className="mb-6 mt-2">
              <div className="flex overflow-x-auto gap-4 pb-2 -mx-1 px-1 snap-x">
                {bankCards.map((card, index) => (
                  <div 
                    key={card.id}
                    className={`flex-shrink-0 w-72 rounded-xl p-5 ${card.color} text-white snap-center transform transition-transform ${activeCard === index ? 'scale-100' : 'scale-95'}`}
                    onClick={() => setActiveCard(index)}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex flex-col">
                        <span className="text-sm opacity-80">{card.bank}</span>
                        <span className="text-xs opacity-60">Debit Card</span>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="font-mono text-lg tracking-wider">{card.number}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-70">Expires</p>
                        <p className="font-medium">{card.expires}</p>
                      </div>
                      <div className="text-white text-xl font-bold">
                        {card.type === "VISA" ? "VISA" : 
                         card.type === "MASTERCARD" ? "MasterCard" : card.type}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Card */}
                <div className="flex-shrink-0 w-60 h-48 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center snap-center">
                  <PlusCircle className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm font-medium">Add New Card</p>
                </div>
              </div>
            </div>
            
            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-blue-600 text-white font-medium py-3 rounded-lg">
                Transfer Money
              </button>
              <button className="bg-white text-blue-600 border border-blue-200 font-medium py-3 rounded-lg">
                Pay Bills
              </button>
            </div>
            
            {/* Recent Transactions */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <Link href="/history" className="text-blue-600 text-sm">View All</Link>
              </div>
              
              <div className="space-y-3">
                <Card className="shadow-sm">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Lottery Ticket</p>
                        <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-R20.00</p>
                      <Badge variant="outline" className="text-xs">Debit</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Lottery Win</p>
                        <p className="text-xs text-gray-500">Yesterday, 2:15 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+R250.00</p>
                      <Badge variant="outline" className="text-xs bg-green-50">Credit</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* QR Payment Tab Content */}
        <TabsContent value="qr" className="mt-0">
          <div className="px-4">
            {/* Print Toggle */}
            <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center justify-between">
              <span className="font-medium">Don't print the receipt</span>
              <Switch 
                checked={printCheck} 
                onCheckedChange={setPrintCheck} 
              />
            </div>
            
            {/* Account Info */}
            <div className="mb-4 text-center">
              <div className="text-sm mb-1">Your account number</div>
              <div className="text-lg font-bold mb-4">
                {userLoading ? "Loading..." : user?.accountNumber || "767755884490"}
              </div>
              
              {/* QR Code */}
              <div className="bg-white rounded-lg p-6 shadow-sm mx-auto max-w-xs mb-2 border border-gray-100">
                <div className="w-full h-64 mx-auto relative">
                  {/* QR Code SVG */}
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="10" y="10" width="30" height="30" />
                    <rect x="40" y="10" width="10" height="10" />
                    <rect x="60" y="10" width="10" height="10" />
                    <rect x="70" y="10" width="30" height="10" />
                    <rect x="110" y="10" width="10" height="10" />
                    <rect x="130" y="10" width="10" height="10" />
                    <rect x="150" y="10" width="30" height="30" />
                    <rect x="10" y="40" width="10" height="30" />
                    <rect x="30" y="40" width="10" height="10" />
                    <rect x="50" y="40" width="50" height="10" />
                    <rect x="110" y="40" width="10" height="10" />
                    <rect x="130" y="40" width="10" height="10" />
                    <rect x="150" y="40" width="10" height="30" />
                    <rect x="170" y="40" width="10" height="10" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="30" y="80" width="30" height="10" />
                    <rect x="70" y="80" width="10" height="10" />
                    <rect x="90" y="80" width="10" height="10" />
                    <rect x="110" y="80" width="30" height="10" />
                    <rect x="150" y="80" width="10" height="10" />
                    <rect x="170" y="80" width="10" height="10" />
                    <rect x="10" y="100" width="10" height="10" />
                    <rect x="30" y="100" width="10" height="10" />
                    <rect x="50" y="100" width="10" height="10" />
                    <rect x="70" y="100" width="10" height="10" />
                    <rect x="90" y="100" width="10" height="10" />
                    <rect x="110" y="100" width="10" height="10" />
                    <rect x="130" y="100" width="10" height="10" />
                    <rect x="150" y="100" width="10" height="10" />
                    <rect x="170" y="100" width="10" height="10" />
                    <rect x="10" y="120" width="10" height="10" />
                    <rect x="30" y="120" width="10" height="10" />
                    <rect x="50" y="120" width="30" height="10" />
                    <rect x="90" y="120" width="30" height="10" />
                    <rect x="130" y="120" width="10" height="10" />
                    <rect x="150" y="120" width="10" height="10" />
                    <rect x="170" y="120" width="10" height="10" />
                    <rect x="30" y="140" width="10" height="10" />
                    <rect x="70" y="140" width="10" height="10" />
                    <rect x="90" y="140" width="10" height="10" />
                    <rect x="110" y="140" width="10" height="10" />
                    <rect x="150" y="140" width="10" height="10" />
                    <rect x="10" y="150" width="30" height="30" />
                    <rect x="50" y="150" width="10" height="10" />
                    <rect x="70" y="150" width="30" height="10" />
                    <rect x="110" y="150" width="10" height="10" />
                    <rect x="130" y="150" width="10" height="30" />
                    <rect x="150" y="150" width="30" height="30" />
                    <rect x="70" y="170" width="10" height="10" />
                    <rect x="90" y="170" width="30" height="10" />
                  </svg>
                  
                  {/* Logo Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <div className="w-12 h-12">
                        <img 
                          src="/assets/app logo.png" 
                          alt="32X Scanner Logo" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">Scan the QR at the checkout to get bonuses</p>
            </div>
                    
            {/* Pay By Card Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg mb-2 shadow">
              Pay by card
            </button>
            
            <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg mb-6 border border-blue-100">
              Download QR Code
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
