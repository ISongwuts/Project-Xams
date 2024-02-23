import React from 'react'
import FormCard from '@/components/FormCard'
import { siteConfig } from '@/config/site'
import { signUpSchema } from '@/services/validation/schema'

function page() {
    
    return (
        <div className='flex justify-center'>
            <FormCard
                title='Sign Up' 
                form={siteConfig.formConfig.signUpForm.attribute} 
                description='Support' 
                isSignIn={false} 
                toPath='/auth/signin'
                sideCard={siteConfig.formConfig.signUpForm.sideCard}
                schema={signUpSchema}
            />
        </div>
    )
}

export default page