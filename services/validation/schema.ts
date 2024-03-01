'use client'
import { z, ZodSchema } from 'zod';


const containsSpecialCharacter = (value:string) => /[!@#$%^&*(),.?":{}|<>]/.test(value);
const usernamePattern = z.string({ required_error: 'Username is required.' })
                        .nonempty({ message: 'Username is required.'})
                        .min(5, { message: 'Username is too short.' })
                        .refine(value => !containsSpecialCharacter(value), {
                            message: 'Username cannot contain special characters.'
                        });
const passwordPattern = z.string({ required_error: 'Password is required.' }).nonempty({ message: 'Password is required.'}).min(8, { message: 'Password is too short.' });

export const usernameSchema: ZodSchema = z.object({
    username: usernamePattern
})

export const infomationSchema: ZodSchema = z.object({
    prefix: z.string({ required_error: 'Prefix is required.' }).nonempty({ message: 'Prefix is required.'}),
    first_name: z.string({ required_error: 'First name is required.' }).nonempty({ message: 'First name is required.'}),
    last_name: z.string({ required_error: 'Last name is required.' }).nonempty({ message: 'Last name is required.'}),
    password: passwordPattern ,
    confirm_password: z.string({ required_error: 'Password is required.' }).nonempty({ message: 'Password is required.'}).min(8, { message: 'Password is too short.' }),
    tel: z.string({ required_error: 'Telephone is required.' }).nonempty({ message: 'Telephone is required.'}),

})

export const signInSchema: ZodSchema = z.object({
    username: usernamePattern ,
    password: passwordPattern
});
