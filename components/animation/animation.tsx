import React from 'react'
import { motion } from 'framer-motion'

export function Slide({ children, isSignIn }: { children: React.ReactNode, isSignIn: boolean }) {
    return (
        <motion.div
            className='w-1/2 max-sm:hidden'
            initial={{
                opacity: 0,
                x: isSignIn ? -300 : 300 // Initial position based on isSignIn
            }}
            animate={{
                opacity: 1,
                x: 0 // Move to center
            }}
            transition={{ duration: .5 }}
        >
            {children}
        </motion.div>
    )
}

export function FadeIn({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className='w-1/2 max-sm:w-full flex flex-col justify-center'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{ duration: 1.5 }}
        >
            {children}
        </motion.div>
    )
}
