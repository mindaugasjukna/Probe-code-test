"use client";
import { useState } from "react";
import Header from "../Header/Header";
import { createContext } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<any>(null);
export const FavoritedTrialsContext = createContext<any>(null);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);
  const [favorites, setFavorites] = useState<{ trialId: string }[]>([]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <FavoritedTrialsContext.Provider
        value={{
          favorites,
          setFavorites,
        }}
      >
        <Header />
        <main>{children}</main>
      </FavoritedTrialsContext.Provider>
    </AuthContext.Provider>
  );
};

export default Layout;
