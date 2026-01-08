import { createContext, useContext, useState } from "react";

const ScanContext = createContext();

export const ScanProvider = ({ children }) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("scanHistory")) || []
  );

  const addScan = (scan) => {
    const updated = [scan, ...history];
    setHistory(updated);
    localStorage.setItem("scanHistory", JSON.stringify(updated));
  };

  return (
    <ScanContext.Provider value={{ history, addScan }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScan = () => useContext(ScanContext);
