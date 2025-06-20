
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DonorDashboard from "./pages/DonorDashboard";
import RequesterDashboard from "./pages/RequesterDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import DonorMap from "./pages/DonorMap";
import Chat from "./pages/Chat";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/requester-dashboard" element={<RequesterDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/donor-map" element={<DonorMap />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
