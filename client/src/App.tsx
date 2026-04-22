import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import DemoPage from "@/pages/demo";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

export default App;
