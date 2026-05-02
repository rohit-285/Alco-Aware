import React, { createContext, useContext, useEffect, useState } from 'react';

const DrunkModeContext = createContext(null);

export const DrunkModeProvider = ({ children }) => {
  const [currentBAC, setCurrentBAC] = useState(0);
  const [isDrunkMode, setIsDrunkMode] = useState(false);

  useEffect(() => {
    setIsDrunkMode(Number(currentBAC || 0) >= 0.08);
  }, [currentBAC]);

  return (
    <DrunkModeContext.Provider value={{ currentBAC, setCurrentBAC, isDrunkMode }}>
      {children}
    </DrunkModeContext.Provider>
  );
};

export const useDrunkMode = () => {
  const context = useContext(DrunkModeContext);
  if (!context) {
    return { currentBAC: 0, setCurrentBAC: () => {}, isDrunkMode: false };
  }
  return context;
};
