'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authenticator } from "otplib";

const noop = () => {};

const DEMO_SECRET = 'otplib:demo:secret';

interface SecretContextProps {
  token: string;
  generateSecret: () => void;
}

export const SecretContext = createContext<SecretContextProps>({
  token: "",
  generateSecret: noop
});

const { Provider } = SecretContext;

interface SecretStoreProps {
  children: ReactNode; 
}

export const SecretStore: React.FC<SecretStoreProps> = ({ children }) => {
  const [secret, setSecret] = useState<string>("");

  function generateSecret() {
    setSecret('');
    
    const newSecret = authenticator.generateSecret();
    window.localStorage.setItem(DEMO_SECRET, newSecret);
    setSecret(newSecret);
  }
    
  useEffect(() => {
    const savedSecret = window.localStorage.getItem(DEMO_SECRET);
    
    if (savedSecret) {
      setSecret(savedSecret);
      return;
    }
    
    generateSecret();
  }, []);

  return (
    <Provider value={{ token: secret, generateSecret }}>
      {children}
    </Provider>
  );
}
