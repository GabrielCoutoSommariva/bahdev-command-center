import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import Sesson from "./pages/Sesson.tsx";
import NotFound from "./pages/NotFound.tsx";

const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Privacidade = lazy(() => import("./pages/Privacidade.tsx"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso.tsx"));
const AdminProtectedRoute = lazy(() => import("./components/admin/AdminProtectedRoute.tsx"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminMfaSetup = lazy(() => import("./pages/admin/AdminMfaSetup.tsx"));
const AdminMfaVerify = lazy(() => import("./pages/admin/AdminMfaVerify.tsx"));
const AdminBlogDashboard = lazy(() => import("./pages/admin/AdminBlogDashboard.tsx"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor.tsx"));

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
            <Route path="/sesson" element={<Sesson />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/politica-de-privacidade" element={<Privacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/admin" element={<Navigate to="/admin/blog" replace />} />
            <Route path="/admin/blog/login" element={<AdminLogin />} />
            <Route
              path="/admin/blog/configurar-2fa"
              element={(
                <AdminProtectedRoute requireMfa={false}>
                  <AdminMfaSetup />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="/admin/blog/verificar-2fa"
              element={(
                <AdminProtectedRoute requireMfa={false}>
                  <AdminMfaVerify />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="/admin/blog"
              element={(
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              )}
            >
              <Route index element={<AdminBlogDashboard />} />
              <Route path="novo" element={<AdminBlogEditor />} />
              <Route path="editar/:id" element={<AdminBlogEditor />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
