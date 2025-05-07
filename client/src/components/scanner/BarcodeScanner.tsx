import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { Camera, FlipHorizontal, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BarcodeScannerProps {
  onScan?: (result: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  const scanMutation = useMutation({
    mutationFn: async (barcode: string) => {
      const response = await apiRequest('POST', '/api/tickets/scan', { barcode });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Ticket scanned successfully!",
        description: "Your ticket has been added to your saved tickets.",
      });
      setLocation('/saved-tickets');
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Scan failed",
        description: "There was an error scanning your ticket. Please try again.",
      });
    }
  });

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: 'environment' }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please allow access to your camera to scan tickets.",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleScan = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }
    
    setScanning(true);
    
    // In a real implementation, this would use a barcode scanning library
    // For now, we'll simulate a successful scan after a delay
    setTimeout(() => {
      setScanning(false);
      
      // Simulate a barcode value
      const mockBarcode = Math.floor(Math.random() * 1000000000000).toString();
      
      if (onScan) {
        onScan(mockBarcode);
      } else {
        scanMutation.mutate(mockBarcode);
      }
      
      stopCamera();
    }, 2000);
  };

  const handleCheckSaved = () => {
    setLocation('/saved-tickets');
  };
  
  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="px-4 mb-8">
      <div className="scan-frame relative mx-auto w-full h-80 rounded-lg bg-black flex items-center justify-center mb-8 overflow-hidden">
        {/* Camera Feed */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
        />
        
        {/* Scanner Overlay */}
        {cameraActive && (
          <>
            {/* Scan Frame Corners */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top Left */}
                <path d="M5 20 L5 5 L20 5" stroke="white" strokeWidth="2" />
                {/* Top Right */}
                <path d="M80 5 L95 5 L95 20" stroke="white" strokeWidth="2" />
                {/* Bottom Left */}
                <path d="M5 80 L5 95 L20 95" stroke="white" strokeWidth="2" />
                {/* Bottom Right */}
                <path d="M80 95 L95 95 L95 80" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            
            {/* Center scanning area with pulsing animation */}
            <div className="absolute w-4/5 h-1/3 border-2 border-white rounded-md flex items-center justify-center animate-pulse">
              {scanning && (
                <div className="h-0.5 bg-green-500 w-full absolute animate-scan"></div>
              )}
            </div>
            
            {/* Camera Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-3">
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FlipHorizontal className="h-5 w-5 text-white" />
              </button>
              <button 
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                onClick={() => stopCamera()}
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </>
        )}
        
        {/* Non-active camera state */}
        {!cameraActive && (
          <div className="flex flex-col items-center justify-center">
            <Camera className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-400 text-center max-w-xs">
              Press the Scan button below to activate your camera and scan a lottery ticket
            </p>
          </div>
        )}
      </div>
      
      {/* Scan Button */}
      <button 
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 rounded-xl mb-4 flex items-center justify-center shadow-lg"
        onClick={handleScan}
        disabled={scanning || scanMutation.isPending}
      >
        <span className="text-lg">
          {scanning || scanMutation.isPending ? 'Scanning...' : (cameraActive ? 'Capture Ticket' : 'Scan & Go')}
        </span>
      </button>
      
      {/* Check Saved Button */}
      <button 
        className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl border border-blue-200 shadow-sm"
        onClick={handleCheckSaved}
      >
        <span>View Saved Tickets</span>
      </button>
      

    </div>
  );
}
