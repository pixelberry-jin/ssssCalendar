import CalendarTableComponent from "@/components/calendar/components/Table";
import { useGetMeInfo } from "@/hooks/useMe";
import { handleLogout } from "@/utils/handleLogout";
import React from "react";

export default function CalendarComponent() {
  const me = useGetMeInfo();

  return (
    <div className="px-10">
      <div className="flex justify-end">
        {me ? (
          <>
            <div>{me.name}</div>
            <div>{me.email}</div>
            <div>{me.loginType}</div>
          </>
        ) : null}
        <button onClick={() => handleLogout()}>로그아웃</button>
      </div>
      <CalendarTableComponent />
    </div>
  );
}
