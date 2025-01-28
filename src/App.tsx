import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./components/WalletProvider";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Phoenix from "./pages/Phoenix";

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shalom" element={<Index />} />
          <Route path="/phoenix" element={<Phoenix />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;