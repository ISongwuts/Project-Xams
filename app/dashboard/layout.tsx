import React from "react"

interface LayoutProps {
    student: React.ReactNode,
    teacher: React.ReactNode,
}

const getUserRole = ():string => {
    return 'teacher'
}

function layout({ student, teacher }: LayoutProps) {
    const userRole:string = getUserRole()
    return (
        <>
        {
            userRole === 'student' ?  student  :  teacher 
        }
        </>
    )
}

export default layout