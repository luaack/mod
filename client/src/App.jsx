import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import BootScreen from "./components/BootScreen";

const App = () => {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsBooting(false);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("hasBooted", "true");
    setIsBooting(false);
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootScreen onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <MainLayout>
          <Home />
        </MainLayout>
      )}
    </>
  );
};

export default App;
