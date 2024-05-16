"use client";
import { useContext } from "react";
import { AuthContext } from "../components/Layout/Layout";
import Login from "@/components/Login/Login";
import Trials from "@/components/Trials/Trials";

const Home: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? <Login /> : <Trials />;
};

export default Home;
