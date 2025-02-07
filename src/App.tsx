import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { WalletProvider } from "./components/WalletProvider";
import Landing from "./pages/Landing";
import Imagine from "./pages/Shalom";
import LA from "./pages/Phoenix";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Collection Not Found</h2>
        <p className="text-xl text-white/80">The collection you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
        >
          Return to Home
        </button>
      </div>
    </main>
  );
};

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/imagine" element={<Imagine />} />
          <Route path="/la" element={<LA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;