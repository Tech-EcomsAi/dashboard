// import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthSession() {
    const router = useRouter()
    // const { data: user } = useSWR("/api/user/userByToken");
    const user: any = null
    useEffect(() => {
        if (!user) router.push("/login");
    }, [user]);
    return user;
}