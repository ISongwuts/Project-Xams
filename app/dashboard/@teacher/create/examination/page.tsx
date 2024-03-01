'use client'
import React from 'react'
import CreateExaminationForm from './_components/create-examination-form'
import CreateQuestionForm from './_components/create-question-form'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import EmptyQuestion from './_components/empty-question'

function page() {
    const { createData } = useCreateExaminationStore()
    return (
        <div className='grid grid-cols-2 gap-8 max-sm:grid-cols-1 w-full'>
            <CreateExaminationForm />
            {
                createData.examinationAmount <= 0 ? <EmptyQuestion /> : <CreateQuestionForm  />
            }
            
        </div>
    )
}

export default page