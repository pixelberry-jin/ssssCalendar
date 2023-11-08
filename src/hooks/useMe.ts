import { IMe } from "@/types/user";
import { useEffect, useState } from "react";

export const useGetMeInfo = () => {
  const [meInfo, setMeInfo] = useState<IMe | undefined>(undefined);

  useEffect(() => {
    const me = localStorage.getItem("me");
    setMeInfo(me ? JSON.parse(me) : undefined);
  }, []);

  return meInfo;
};
