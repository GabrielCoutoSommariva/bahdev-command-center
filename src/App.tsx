import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import SpaRedirectHandler from "./components/SpaRedirectHandler";
import Index from "./pages/Index.tsx";
import Omnichannel from "./pages/Omnichannel.tsx";
import Portal from "./pages/Portal.tsx";
import Dashboards from "./pages/Dashboards.tsx";
import Campanhas from "./pages/Campanhas.tsx";
import Treinamento from "./pages/Treinamento.tsx";
import NotFound from "./pages/NotFound.tsx";

const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SpaRedirectHandler />
        <ScrollToTop />
        <Suspense
          fallback={(
            <div className="flex min-h-screen items-center justify-center bg-background text-sm font-semibold text-muted-foreground">
              Carregando conteúdo...
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/omnichannel" element={<Omnichannel />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/campanhas" element={<Campanhas />} />
            <Route path="/treinamento" element={<Treinamento />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
