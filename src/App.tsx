import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/lib/auth';
import Admin from '@/pages/admin';
import Discover from '@/pages/discover';
import DriverDashboard from '@/pages/driver-dashboard';
import DriverRegister from '@/pages/driver-register';
import Home from '@/pages/home';
import Login from '@/pages/login';
import NotFound from '@/pages/not-found';
import Orders from '@/pages/orders';
import Profile from '@/pages/profile';
import ProviderDashboard from '@/pages/provider-dashboard';
import ProviderDetail from '@/pages/provider-detail';
import ProviderRegister from '@/pages/provider-register';
import Register from '@/pages/register';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discover" component={Discover} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route path="/provider/dashboard" component={ProviderDashboard} />
      <Route path="/provider/register" component={ProviderRegister} />
      <Route path="/driver/dashboard" component={DriverDashboard} />
      <Route path="/driver/register" component={DriverRegister} />
      <Route path="/providers/:id" component={ProviderDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
