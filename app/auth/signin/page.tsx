import React from 'react'
import FormCard from '@/components/FormCard'
import { siteConfig } from '@/config/site'
import { signInSchema } from '@/services/validation/schema'

function page() {
    
    return (
        <div className='flex justify-center'>
            <FormCard 
                title='Sign In' 
                form={siteConfig.formConfig.signInForm.attribute} 
                description='Support' 
                isSignIn={true} 
                toPath='/auth/signup'
                sideCard={siteConfig.formConfig.signInForm.sideCard}
                schema={signInSchema}
            />
        </div>
    )
}

export default page