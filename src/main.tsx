import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import LandingPage from './pages/LandingPage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CourseDetailPage from './pages/CourseDetailPage.tsx';
import RoadmapsPage from './pages/RoadmapsPage.tsx';
import RoadmapDetailPage from './pages/RoadmapDetailPage.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="course/:id" element={<CourseDetailPage />} />
            <Route path="roadmaps" element={<RoadmapsPage />} />
            <Route path="roadmaps/:slug" element={<RoadmapDetailPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="login" element={<div className="pt-24 px-8 text-white">Login Page (Coming Soon)</div>} />
            <Route path="signup" element={<div className="pt-24 px-8 text-white">Signup Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
