import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Music from "@/pages/Music";
import Podcast from "@/pages/Podcast";
import Photography from "@/pages/Photography";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function AnimatedRoute({ path, component: Component }: { path?: string; component: any }) {
  return (
    <Route path={path} component={Component ? () => (
      <PageTransition>
        <Component />
      </PageTransition>
    ) : undefined} />
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <div key={location}>
          <Switch location={location}>
            <AnimatedRoute path="/" component={Home} />
            <AnimatedRoute path="/about" component={About} />
            <AnimatedRoute path="/music" component={Music} />
            <AnimatedRoute path="/podcast" component={Podcast} />
            <AnimatedRoute path="/photography" component={Photography} />
            <AnimatedRoute path="/events" component={Events} />
            <AnimatedRoute path="/contact" component={Contact} />
            <AnimatedRoute component={NotFound} />
          </Switch>
        </div>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
