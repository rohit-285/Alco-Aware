import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { generatePersonality } from '../utils/personalityEngine';
import { getHumorMessages } from '../utils/humorEngine';

const BACContext = createContext();

export const useBAC = () => useContext(BACContext);

export const BACProvider = ({ children }) => {
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [personality, setPersonality] = useState(null);
  const [humorMessages, setHumorMessages] = useState([]);
  
  // Store form inputs to regenerate humor/personality
  const [lastInputs, setLastInputs] = useState(null);

  const calculate = async (data) => {
    setIsCalculating(true);
    try {
      const response = await api.post('/calculate', data);
      
      if (response.success) {
        setCalculationResult(response.data);
        setLastInputs(data);
        
        // Generate Personality & Humor based on inputs and result
        setPersonality(generatePersonality());
        setHumorMessages(getHumorMessages(data.drinkCount, response.data.bac, data.experience));
        
        return true;
      }
    } catch (error) {
      toast.error(error.message || 'Calculation failed. Please try again.');
      return false;
    } finally {
      setIsCalculating(false);
    }
  };

  const rerollPersonality = () => {
    setPersonality(generatePersonality());
  };

  const rerollHumor = () => {
    if (lastInputs && calculationResult) {
      setHumorMessages(getHumorMessages(lastInputs.drinkCount, calculationResult.bac, lastInputs.experience));
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
      lastInputs
    }}>
      {children}
    </BACContext.Provider>
  );
};
