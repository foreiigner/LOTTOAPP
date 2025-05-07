import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PhoneVerification() {
  const [country, setCountry] = useState("+27");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  
  const sendCodeMutation = useMutation({
    mutationFn: async (data: { country: string; phone: string }) => {
      const response = await apiRequest('POST', '/api/auth/send-code', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      });
    }
  });

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
      });
      return;
    }
    
    sendCodeMutation.mutate({ country, phone: phoneNumber });
  };

  return (
    <div>
      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center">
          <Link href="/" className="text-accent block">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Enter phone number</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4">
        <p className="text-gray-500 text-center mb-4">We'll text you a code to make sure we got the number right</p>
        
        {/* Phone Input */}
        <div className="flex gap-2 mb-4">
          <div className="flex-shrink-0 relative bg-white rounded-lg border border-gray-300 px-3 py-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-4 bg-contain bg-no-repeat" style={{backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PHBhdGggZmlsbD0iIzAwOWIzYSIgZD0iTTAgMGgxMjAwdjgwMEgweiIvPjxwYXRoIGZpbGw9IiNmZjMiIGQ9Ik0wIDBoMTIwMHY3MDBIMHoiLz48cGF0aCBkPSJNMCAwaDEyMDB2NjAwSDB6Ii8+PHBhdGggZmlsbD0iI2RlMjAxMCIgZD0iTTAgMGgxMjAwdjUwMEgweiIvPjxwYXRoIGZpbGw9IiMwMDBlNmUiIGQ9Ik0wIDBoMTIwMHY0MDBIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDEyMDB2MzAwSDB6Ii8+PHBhdGggZmlsbD0iIzAwOWIzYSIgZD0iTTAgMGgxMjAwdjIwMEgweiIvPjxwYXRoIGZpbGw9IiNmZjMiIGQ9Ik0wIDBoMTIwMHYxMDBIMHoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMCA0MDBoMTIwMHYxMDBIMHptMCAyMDBoMTIwMHYxMDBIMHptMCAyMDBoMTIwMHYxMDBIMHoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMzAwIDBoMTAwdjgwMEgzMDB6Ii8+PC9zdmc+')`}}></div>
              <span className="text-black font-medium">{country}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg border border-gray-300 px-3 py-2.5">
            <input 
              type="tel" 
              className="w-full outline-none text-gray-800" 
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        
        {/* Send Code Button */}
        <button 
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg mb-8"
          onClick={handleSendCode}
          disabled={sendCodeMutation.isPending}
        >
          {sendCodeMutation.isPending ? "Sending..." : "Send code"}
        </button>
        
        {/* Keypad */}
        <div className="grid grid-cols-3 gap-1">
          {/* Row 1 */}
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "1")}
          >1</button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "2")}
          >
            <div className="flex flex-col items-center">
              <span>2</span>
              <span className="text-xs text-gray-500">ABC</span>
            </div>
          </button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "3")}
          >
            <div className="flex flex-col items-center">
              <span>3</span>
              <span className="text-xs text-gray-500">DEF</span>
            </div>
          </button>
          
          {/* Row 2 */}
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "4")}
          >
            <div className="flex flex-col items-center">
              <span>4</span>
              <span className="text-xs text-gray-500">GHI</span>
            </div>
          </button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "5")}
          >
            <div className="flex flex-col items-center">
              <span>5</span>
              <span className="text-xs text-gray-500">JKL</span>
            </div>
          </button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "6")}
          >
            <div className="flex flex-col items-center">
              <span>6</span>
              <span className="text-xs text-gray-500">MNO</span>
            </div>
          </button>
          
          {/* Row 3 */}
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "7")}
          >
            <div className="flex flex-col items-center">
              <span>7</span>
              <span className="text-xs text-gray-500">PQRS</span>
            </div>
          </button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "8")}
          >
            <div className="flex flex-col items-center">
              <span>8</span>
              <span className="text-xs text-gray-500">TUV</span>
            </div>
          </button>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "9")}
          >
            <div className="flex flex-col items-center">
              <span>9</span>
              <span className="text-xs text-gray-500">WXYZ</span>
            </div>
          </button>
          
          {/* Row 4 */}
          <div className="py-4"></div>
          <button 
            className="py-4 text-center text-xl font-medium"
            onClick={() => setPhoneNumber(phoneNumber + "0")}
          >0</button>
          <button 
            className="py-4 flex justify-center items-center"
            onClick={() => setPhoneNumber(phoneNumber.slice(0, -1))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
