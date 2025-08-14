import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import InvoicePages from "./pages/InvoicePages.jsx";
import NotFound from "./pages/NotFound.jsx";
import OnboardingLayout from "./components/OnboardingLayout/Onboardinglayout";

import ContactsPage from "./pages/ContactsPage.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingLayout />} />
          <Route
            path="/book_keeping"
            element={
              <DefaultLayout>
                <InvoicePages />
              </DefaultLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <DefaultLayout>
                <InvoicePages />
              </DefaultLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <DefaultLayout>
                <ContactsPage />
              </DefaultLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
