// src/App.js
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const App = () => {
  const routing = useRoutes(ThemeRoutes);

  return (
    <div className="dark font-sans">
      {/* Suspense untuk menangani lazy-loaded route */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
            Loading...
          </div>
        }
      >
        {routing}
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default App;
