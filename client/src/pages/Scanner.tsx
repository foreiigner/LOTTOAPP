import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import BarcodeScanner from "@/components/scanner/BarcodeScanner";

export default function Scanner() {
  return (
    <div>
      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center">
          <Link href="/" className="text-accent block">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Scanner</h1>
        </div>
      </div>
      
      <BarcodeScanner />
    </div>
  );
}
