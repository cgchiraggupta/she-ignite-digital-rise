import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StartHere from "./pages/StartHere";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import SuccessStories from "./pages/SuccessStories";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import EventRegistration from "./pages/EventRegistration";
import UpcomingTraining from "./pages/UpcomingTraining";
import TrainingDetails from "./pages/TrainingDetails";
import TrainingRegistration from "./pages/TrainingRegistration";
import AdminPanel from "./pages/AdminPanel";
import Podcast from "./pages/Podcast";
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
          <Route path="/start-here" element={<StartHere />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/events/:eventId/register" element={<EventRegistration />} />
          <Route path="/upcoming-training" element={<UpcomingTraining />} />
          <Route path="/training/:trainingId" element={<TrainingDetails />} />
          <Route path="/training/:trainingId/register" element={<TrainingRegistration />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
