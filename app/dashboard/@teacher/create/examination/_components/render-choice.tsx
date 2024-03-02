'use client'
import React from 'react'
import { Button } from '@nextui-org/button'
import {
    MultipleChoiceForm,
    SingleChoiceForm,
    MultipleImageChoiceForm,
    SingleImageChoiceForm,
    SubjectiveForm,
    TrueOrFalseForm
} from './choice-form'
import { ErrorFilledIcon } from '@/components/icons'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import { RadioGroup } from '@nextui-org/radio'

function RenderChoice() {
    const {
        createData,
        setUpdateTrigger,
    } = useCreateExaminationStore()
    if (createData.questions[createData.current].type === '0') {
        return (
            <RadioGroup className='w-full' orientation='vertical'>
                {
                    createData.questions[createData.current].choices.map((item, index: number) => (
                        <div key={index} className='flex items-center gap-3 w-full'>
                            {<SingleChoiceForm index={index} />}
                            {index + 1 == createData.questions[createData.current].choices.length && <Button
                                isIconOnly
                                size='sm'
                                color='danger'
                                onClick={(e) => {
                                    createData.questions[createData.current].choices.pop()
                                    setUpdateTrigger(createData.updateTrigger)
                                }}
                                className='p-0 m-0'
                            ><ErrorFilledIcon size={20} /></Button>}
                        </div>
                    ))}
            </RadioGroup>)
    }
    if (createData.questions[createData.current].type === '1') {
        return (
            createData.questions[createData.current].choices.map((item, index: number) => (
                <div key={index} className='flex items-center gap-3 w-full'>
                    {<MultipleChoiceForm index={index} />}
                    {index + 1 == createData.questions[createData.current].choices.length &&
                        <Button
                            isIconOnly
                            size='sm'
                            color='danger'
                            onClick={(e) => {
                                createData.questions[createData.current].choices.pop()
                                setUpdateTrigger(createData.updateTrigger)
                            }}
                            className='p-0 m-0'
                        ><ErrorFilledIcon size={20} /></Button>}
                </div>
            ))
        )

    }
    if (createData.questions[createData.current].type === '2') {
        return (
            <RadioGroup className='w-full' orientation='vertical'>
                {
                    createData.questions[createData.current].choices.map((item, index: number) => (
                        <div key={index} className='flex items-center gap-3 w-full'>
                            {<SingleImageChoiceForm index={index} />}
                            {index + 1 == createData.questions[createData.current].choices.length && <Button
                                isIconOnly
                                size='sm'
                                color='danger'
                                onClick={(e) => {
                                    createData.questions[createData.current].choices.pop()
                                    setUpdateTrigger(createData.updateTrigger)
                                }}
                                className='p-0 m-0'
                            ><ErrorFilledIcon size={20} /></Button>}
                        </div>
                    ))}
            </RadioGroup>
        )

    }
    if (createData.questions[createData.current].type === '3') {
        return (
            createData.questions[createData.current].choices.map((item, index: number) => (
                <div key={index} className='flex items-center gap-3 w-full'>
                    {<MultipleImageChoiceForm index={index} />}
                    {index + 1 == createData.questions[createData.current].choices.length &&
                        <Button
                            isIconOnly
                            size='sm'
                            color='danger'
                            onClick={(e) => {
                                createData.questions[createData.current].choices.pop()
                                setUpdateTrigger(createData.updateTrigger)
                            }}
                            className='p-0 m-0'
                        ><ErrorFilledIcon size={20} /></Button>}
                </div>
            ))
        )

    }
    if (createData.questions[createData.current].type === '4') {
        return (
            <div className='flex items-center gap-3 w-full'>
                {<SubjectiveForm />}
            </div>

        )

    }
    if (createData.questions[createData.current].type === '5') {
        return (
            <div className='flex items-center gap-3 w-full'>
                {<TrueOrFalseForm />}
            </div>

        )

    }

}

export default RenderChoice