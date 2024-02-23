'use server'

// Import necessary modules and types
import { prisma } from "../utils/prismaInstance"
import { Prefix, Role } from "@prisma/client"
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
// Define the type for the authentication action response
type authActionType = {
    status: {
        ok: boolean
    },
    message: string,
    user: object
}

// Define the authentication action function
export default async function authAction(formValue: any, isSignIn: boolean, role:string): Promise<authActionType> {
    try {
        // Handle sign-in action
        if (isSignIn) {
            // Extract username and password from form data
            const { username, password } = formValue
            const plainPassword: string = password

            // Query user by username
            const user: object[] = await prisma.users.findMany({
                where: {
                    username: username
                }
            })

            // Check if user exists
            const userIsExist: boolean = user.length > 0
            if (userIsExist) {
                // If user exists, compare passwords
                const { password }: any = user[0];
                const passwordIsMatch = await bcrypt.compare(plainPassword, password)

                // Return success message if password matches
                if (passwordIsMatch) {
                    console.log('Sign In Successfully')
                    
                    return {
                        status: { ok: true },
                        message: 'Sign In Successfully',
                        user: user[0]
                    }
                } else {
                    // Return error message if password does not match
                    console.log('Password did not match')
                    return {
                        status: { ok: false },
                        message: 'Password did not match',
                        user: {}
                    }
                }

            } else {
                // Return error message if username does not exist
                console.log('Username is not exist.')
                return {
                    status: { ok: false },
                    message: 'Username is not exist.',
                    user: {}
                }
            }
        } else {
            // Handle sign-up action
            const { username, prefix, first_name, last_name, password, tel, personal_id } = formValue

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10)

            // Create new user in the database
            const newUser = await prisma.users.create({
                data: {
                    username,
                    prefix: Object.values(Prefix)[Number.parseInt(prefix)],
                    first_name,
                    last_name,
                    password: hashedPassword,
                    tel,
                    personal_id,
                    role: Object.values(Role)[role === 'student' ? 0 : 1]
                }
            })

            // Return success message with new user data
            return {
                status: { ok: true },
                message: 'User created successfully',
                user: newUser
            }
        }
    } catch (error: any) {
        // Catch and handle any errors that occur
        console.log(error.message)
        return {
            status: { ok: false },
            message: error.message,
            user: {}
        }
    } finally {
        // Close Prisma client connection to prevent resource leaks
        await prisma.$disconnect()
    }
}

