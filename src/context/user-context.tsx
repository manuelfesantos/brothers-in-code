import { User } from "@/types/user";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const userContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
