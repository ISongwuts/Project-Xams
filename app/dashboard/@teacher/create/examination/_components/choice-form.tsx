import React from 'react'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import { Radio, RadioGroup } from '@nextui-org/radio'
import CustomRadio from '@/components/customs/CustomRadio'
type PropsType = {
    index: number
}

export function SingleChoiceForm(props: PropsType) {
    const { createData } = useCreateExaminationStore()
    return (
        <div className=' flex w-full'>
            <Radio name='score' value={String(props.index)}/>
            <Input
                name='choice'
                variant='bordered'
                size='sm'
                label={`Choice no.${props.index + 1}`}
                type='text'
                className='col-span-4'
                value={createData.questions[createData.current].choices[props.index].desc}
                isRequired
            />
        </div>
    )
}

export function MultipleChoiceForm(props: PropsType) {
    let options = [
        { label: "0 p.", value: "0" },
        { label: "0.125 p.", value: "0.125" },
        { label: "0.25 p.", value: "0.25" },
    ]
    const { createData, setUpdateTrigger } = useCreateExaminationStore()
    return (
        <div className='grid grid-cols-5 gap-3 w-full'>
            <Input
                name='choice'
                variant='bordered'
                size='sm'
                label={`Choice no.${props.index + 1}`}
                type='text'
                className='col-span-4'
                value={createData.questions[createData.current].choices[props.index].desc}
                isRequired
            />
            <Select
                items={options}
                name='score'
                className='col-span-1'
                size='sm'
                label='Score'
                variant='bordered'
                selectedKeys={[String(createData.questions[createData.current].choices[props.index].score)]}
                isRequired
                onChange={(e) => {
                    createData.questions[createData.current].choices[props.index].score = Number.parseFloat(e.target.value)
                    setUpdateTrigger(createData.current)
                }}
            >
                {(option) => <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>}
            </Select>
        </div>

    )
}

export function SingleImageChoiceForm(props: PropsType) {
    const { createData } = useCreateExaminationStore()
    return (
        <div className=' flex w-full'>
            <Radio name='score' value={String(props.index)}/>
            <Input
                name='choice'
                variant='faded'
                size='sm'
                type='file'
                className='col-span-4'
                value={createData.questions[createData.current].choices[props.index].desc}
            />
        </div>
    )
}

export function MultipleImageChoiceForm(props: PropsType) {
    let options = [
        { label: "0 p.", value: "0" },
        { label: "0.125 p.", value: "0.125" },
        { label: "0.25 p.", value: "0.25" },
    ]
    const { createData, setUpdateTrigger } = useCreateExaminationStore()
    return (
        <div className='grid grid-cols-5 gap-3 w-full'>
            <Input
                name='choice'
                variant='faded'
                size='sm'
                type='file'
                className='col-span-4'
                value={createData.questions[createData.current].choices[props.index].desc}
            />
            <Select
                items={options}
                name='score'
                className='col-span-1'
                size='sm'
                label='Score'
                variant='bordered'
                selectedKeys={[String(createData.questions[createData.current].choices[props.index].score)]}
                isRequired
                onChange={(e) => {
                    createData.questions[createData.current].choices[props.index].score = Number.parseFloat(e.target.value)
                    setUpdateTrigger(createData.current)
                }}
            >
                {(option) => <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>}
            </Select>
        </div>

    )
}

export function SubjectiveForm() {
    const { createData } = useCreateExaminationStore()
    return (
        <div className='w-full'>
            <Input
                name='choice'
                variant='bordered'
                size='sm'
                label='Answer is'
                type='text'
                value={createData.questions[createData.current].choices[0].desc}
            />
        </div>

    )
}

export function TrueOrFalseForm() {
    return (
        <div className='w-full flex justify-center'>
            <RadioGroup defaultValue='0' name='score' orientation='horizontal'>
                <CustomRadio value='0'>True</CustomRadio>
                <CustomRadio value='1'>False</CustomRadio>
            </RadioGroup>
        </div>

    )
}