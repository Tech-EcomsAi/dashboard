// import useSWR from "swr";
import { useEffect } from "react";
import Router from "next/navigation";

export function useAuthSession() {
    // const { data: user } = useSWR("/api/user/userByToken");
    const user: any = null
    useEffect(() => {
        if (!user) Router.push("/login");
    }, [user]);
    return user;
}