import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NewsInsights from "./pages/NewsInsights";
import Partnerships from "./pages/Partnerships";
import Impact from "./pages/Impact";
import Leadership from "./pages/Leadership";
import Philanthropy from "./pages/Philanthropy";

const Admin = lazy(() => import("./pages/Admin"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/news-insights" element={<NewsInsights />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/partnerships" element={<Partnerships />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/philanthropy" element={<Philanthropy />} />
      <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen bg-[#07060f]" aria-label="Loading admin" />}><Admin /></Suspense>} />
      <Route path="*" element={<Index />} />
    </Routes>
  </BrowserRouter>,
);
