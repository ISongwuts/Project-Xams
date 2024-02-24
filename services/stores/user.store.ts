import { UserType } from "@/types"
import { users } from "@prisma/client"
import { create } from "zustand"
import { getSession } from "../libs/auth.lib"

interface UserStore {
    user: users | UserType | null
}

export const useUserStore = create<Promise<UserStore> | UserStore>(async () => ({
    user: await getSession()
}))

export const setUser = (user: any) => {
    useUserStore.setState({ user, })
}