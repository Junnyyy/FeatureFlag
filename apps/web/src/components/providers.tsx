"use client"

import { createContext, useContext, useState } from "react";
import { FeatureFlagProvider } from "@feature-flag/gatekeeper";

interface UserContextType {
  userId: string;
  toggleUser: () => void;
  hasFlag: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [userId, setUserId] = useState("user-123");
  
  const toggleUser = () => {
    setUserId(prev => prev === "user-123" ? "user-122" : "user-123");
  };
  
  const hasFlag = userId === "user-122";

  return (
    <UserContext.Provider value={{ userId, toggleUser, hasFlag }}>
      <FeatureFlagProvider userId={userId} apiUrl="/api/flags">
        {children}
      </FeatureFlagProvider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within Providers');
  }
  return context;
}