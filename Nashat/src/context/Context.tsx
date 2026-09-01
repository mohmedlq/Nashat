import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Broadcast } from "../types/BroadcastTypes";
import type { ReportFormData as ReportData } from "../types/ReportsTypes";

interface UserContextType {
  chatHistory: Message[];
  setChatHistory: React.Dispatch<
    React.SetStateAction<Message[]>
  >;

  schoolName: string;
  setSchoolName: React.Dispatch<
    React.SetStateAction<string>
  >;

  teacherName: string;
  setTeacherName: React.Dispatch<
    React.SetStateAction<string>
  >;

  region: string;
  setRegion: React.Dispatch<
    React.SetStateAction<string>
  >;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text?: string;
  broadcastData?: Broadcast;
  reportData?: ReportData;
}

interface UserProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "school_ai_chat_history";
const USER_INFO_KEY = "school_ai_user_info";

export const UserContext =
  createContext<UserContextType | null>(null);

export function UserProvider({
  children,
}: UserProviderProps) {
  /* =========================
     Chat History
  ========================= */

  const [chatHistory, setChatHistory] =
    useState<Message[]>(() => {
      const history =
        localStorage.getItem(STORAGE_KEY);

      return history
        ? JSON.parse(history)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(chatHistory)
    );
  }, [chatHistory]);

  /* =========================
     User Information
  ========================= */

  const [schoolName, setSchoolName] =
    useState<string>(() => {
      const saved =
        localStorage.getItem(USER_INFO_KEY);

      if (!saved) return "";

      const data = JSON.parse(saved);

      return data.schoolName ?? "";
    });

  const [teacherName, setTeacherName] =
    useState<string>(() => {
      const saved =
        localStorage.getItem(USER_INFO_KEY);

      if (!saved) return "";

      const data = JSON.parse(saved);

      return data.teacherName ?? "";
    });

  const [region, setRegion] =
    useState<string>(() => {
      const saved =
        localStorage.getItem(USER_INFO_KEY);

      if (!saved) return "";

      const data = JSON.parse(saved);

      return data.region ?? "";
    });

  /* =========================
     Save User Information
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      USER_INFO_KEY,
      JSON.stringify({
        schoolName,
        teacherName,
        region,
      })
    );
  }, [
    schoolName,
    teacherName,
    region,
  ]);

  /* =========================
     Provider
  ========================= */

  return (
    <UserContext.Provider
      value={{
        chatHistory,
        setChatHistory,

        schoolName,
        setSchoolName,

        teacherName,
        setTeacherName,

        region,
        setRegion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}