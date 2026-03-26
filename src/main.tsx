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
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import VerifyEmailPage from './pages/VerifyEmailPage.tsx';
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
          </Route>
          
          {/* Auth Routes (No Navbar/Sidebar) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
