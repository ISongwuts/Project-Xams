import React from "react"
import { useUserStore } from "@/services/stores/user.store"

interface LayoutProps {
    student: React.ReactNode,
    teacher: React.ReactNode,
}

const getUserRole = async ():Promise<string> => {
    const { user } = await useUserStore.getState()
    console.log(user?.role)
    return String(user?.role)
}

async function layout({ student, teacher }: LayoutProps) {
    const userRole = await getUserRole()
    return (
        <>
        {
            userRole === 'role_1' ?  student  :  teacher 
        }
        </>
    )
}

export default layout