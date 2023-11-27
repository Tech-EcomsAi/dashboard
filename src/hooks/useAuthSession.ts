// import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useAuthSession() {
    const router = useRouter()
    const { data: session } = useSession()
    const user: any = session?.user
    useEffect(() => {
        if (!user) router.push("/login");
    }, [user]);
    return user;
}