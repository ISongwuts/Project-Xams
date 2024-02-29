import React from 'react'
import FormCard from '@/components/forms/signup-formcard'
import { siteConfig } from '@/config/site'
import { infomationSchema } from '@/services/validation/schema'

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
                schema={infomationSchema}
            />
        </div>
    )
}

export default page