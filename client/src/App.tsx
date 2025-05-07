import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AppShell from "@/components/layout/AppShell";
import Home from "@/pages/Home";
import Scanner from "@/pages/Scanner";
import Payment from "@/pages/Payment";
import History from "@/pages/History";
import Details from "@/pages/Details";
import SavedTickets from "@/pages/SavedTickets";
import PhoneVerification from "@/pages/PhoneVerification";
import AuthPage from "@/pages/auth-page";
import Profile from "@/pages/Profile";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Home} />
      <ProtectedRoute path="/scanner" component={Scanner} />
      <ProtectedRoute path="/payment" component={Payment} />
      <ProtectedRoute path="/history" component={History} />
      <ProtectedRoute path="/details/:id" component={Details} />
      <ProtectedRoute path="/saved-tickets" component={SavedTickets} />
      <ProtectedRoute path="/verify-phone" component={PhoneVerification} />
      <ProtectedRoute path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/auth" component={AuthPage} />
            <Route>
              <AppShell>
                <Router />
              </AppShell>
            </Route>
          </Switch>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
