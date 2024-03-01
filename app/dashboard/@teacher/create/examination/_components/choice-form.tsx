import React from 'react'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'

type PropsType = {
    index: number
}

export function MultiChoiceForm() {
    const select = ['0', '1', '2', '3']
    return (
        <div className='grid grid-cols-5 gap-3 w-full'>
            <Input
                variant='bordered'
                size='sm'
                label={`Choice no.`}
                type='text'
                className='col-span-4'
            />
            <Select
                className='col-span-1'
                size='sm'
                label='Score'
                variant='bordered'
                value='0'
            >
                {select.map((val, index) => <SelectItem key={index} value={val}>{val}</SelectItem>)}
            </Select>

        </div>
    )
}

export function SingleChoiceForm(props: PropsType) {
    const select = ['0', '1', '2', '3']
    return (
        <div className='grid grid-cols-5 gap-3 w-full'>
            <Input
                name={`choice`}
                variant='bordered'
                size='sm'
                label={`Choice no.${props.index + 1}`}
                type='text'
                className='col-span-4'
                isRequired
            />
            <Select
                name={`score`}
                className='col-span-1'
                size='sm'
                label='Score'
                variant='bordered'
                value='0'
                isRequired
            >
                {select.map((val, index) => <SelectItem key={index} value={val}>{val}</SelectItem>)}
            </Select>

        </div>

    )
}