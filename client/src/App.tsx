import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import DemoPage from "@/pages/demo";
import WorkPage from "@/pages/work";
import CaseDetailPage from "@/pages/case-detail";
import ServicesPage from "@/pages/services";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact-page";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/work" component={WorkPage} />
      <Route path="/work/:slug" component={CaseDetailPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
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
