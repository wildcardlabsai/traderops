import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import AppLayout from "./components/app/AppLayout.tsx";
import Dashboard from "./pages/app/Dashboard.tsx";
import Stock from "./pages/app/Stock.tsx";
import Marketplace from "./pages/app/Marketplace.tsx";
import Wanted from "./pages/app/Wanted.tsx";
import Deals from "./pages/app/Deals.tsx";
import Contacts from "./pages/app/Contacts.tsx";
import Movements from "./pages/app/Movements.tsx";
import Documents from "./pages/app/Documents.tsx";
import Alerts from "./pages/app/Alerts.tsx";
import Settings from "./pages/app/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="stock" element={<Stock />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="wanted" element={<Wanted />} />
              <Route path="deals" element={<Deals />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="movements" element={<Movements />} />
              <Route path="documents" element={<Documents />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
