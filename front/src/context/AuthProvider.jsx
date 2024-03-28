import { useGetLogedInUserInfo } from "@/hooks/useUsers";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
// alert('hi')
  const [auth, setAuth] = useState({});
  const { data } = useGetLogedInUserInfo();

  useEffect(() => {
    if (data?.data !== undefined) {
      setAuth(data?.data);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
