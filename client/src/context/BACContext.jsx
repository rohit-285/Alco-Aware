import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { generatePersonality } from '../utils/personalityEngine';
import { getHumorMessages } from '../utils/humorEngine';
import { useDrunkMode } from './DrunkModeContext';

const BACContext = createContext();

export const useBAC = () => useContext(BACContext);

export const BACProvider = ({ children }) => {
  const { setCurrentBAC } = useDrunkMode();
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [personality, setPersonality] = useState(null);
  const [humorMessages, setHumorMessages] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alcoaware_history') || '[]');
    } catch {
      return [];
    }
  });
  
  // Store form inputs to regenerate humor/personality
  const [lastInputs, setLastInputs] = useState(null);

  const calculate = async (data) => {
    setIsCalculating(true);
    try {
      const response = await api.post('/calculate', data);
      
      if (response.success) {
        const entry = {
          localId: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          inputs: data,
          result: response.data
        };
        setCalculationResult(response.data);
        setHistory((current) => [entry, ...current].slice(0, 100));
        setCurrentBAC(response.data.bac);
        setLastInputs(data);
        
        // Generate Personality & Humor based on inputs and result
        setPersonality(generatePersonality());
        setHumorMessages(getHumorMessages(data.drinkCount || data.drinks?.length || 1, response.data.bac, data.experience));
        
        return true;
      }
    } catch (error) {
      toast.error(error.message || 'Calculation failed. Please try again.');
      return false;
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('alcoaware_history', JSON.stringify(history));
  }, [history]);

  const deleteHistoryEntry = (localId) => {
    setHistory((current) => current.filter((entry) => entry.localId !== localId));
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success('Personal stats cleared.');
  };

  const rerollPersonality = () => {
    setPersonality(generatePersonality());
  };

  const rerollHumor = () => {
    if (lastInputs && calculationResult) {
      setHumorMessages(getHumorMessages(lastInputs.drinkCount || lastInputs.drinks?.length || 1, calculationResult.bac, lastInputs.experience));
    }
  };

  return (
    <BACContext.Provider value={{
      calculationResult,
      isCalculating,
      calculate,
      personality,
      rerollPersonality,
      humorMessages,
      rerollHumor,
      lastInputs,
      history,
      deleteHistoryEntry,
      clearHistory
    }}>
      {children}
    </BACContext.Provider>
  );
};
