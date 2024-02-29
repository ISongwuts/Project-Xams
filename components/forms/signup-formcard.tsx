'use client'
import React, { ReactElement, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import Image, { StaticImageData } from 'next/image'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Checkbox } from '@nextui-org/checkbox'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'
import UsernameValidationForm from './step-form-validation/username-form'
import PasswordValidationForm from './step-form-validation/password-form'
import { usernameIsExist } from '@/services/actions/form-action.auth'
import { RadioGroup } from '@nextui-org/radio'
import { CustomRadio } from '../customs/CustomRadio'
import { cn } from '@nextui-org/system'
import { Select, SelectItem } from '@nextui-org/select'
import { toast } from 'react-toastify'
import { SendCheckFilledIcon, VerifyFilledIcon, InvalidFilledIcon } from '../icons'
import { Tooltip } from '@nextui-org/tooltip'
import 'react-toastify/dist/ReactToastify.css';

interface PropsType {
    title: string,
    form:
    {
        label: string,
        type: string,
        name: string
    }[]
    ,
    description: string,
    isSignIn: boolean,
    toPath: string
    sideCard: {
        cardTitle: string,
        cardDescription: string,
        cardImage: StaticImageData
    }
    schema: ZodSchema
}
function FormCard(props: PropsType) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(props.schema),
    })
    const prefixs = ['นาย', 'นาง', 'นางสาว', "Mr.", "Mrs.", "Ms.", "Miss"]
    const [role, setRole] = useState<string>('')
    const [stepValidation, setStepValidation] = useState<number>(0)
    const [disabled, setDisabled] = useState<boolean>(true)
    const stepValidationRenderer: ReactElement[] = [
        <UsernameValidationForm setDiabled={setDisabled} />, 
        <PasswordValidationForm setDiabled={setDisabled} />
    ]

    const onNextHandler = (e:React.MouseEvent) => {
        setStepValidation(prev => prev + 1)
        setDisabled(true)
    }

    return (
        <Card className=' bg-background w-1/2 max-md:w-[80%] max-sm:w-[95%]'>
            <CardHeader className='flex justify-center text-2xl font-bold'><span>{props.title}</span></CardHeader>
            <CardBody className={`flex flex-col max-sm:flex-col gap-4 ${props.isSignIn ? 'flex-row-reverse' : null}`}>
                {
                    stepValidationRenderer[stepValidation]
                }
                <form
                    method='POST'
                    onSubmit={handleSubmit(() => { })}
                    className='w-full flex flex-col gap-2 justify-center px-8'>

                    <ButtonGroup aria-label='btn-group'>
                        {stepValidation > 0 && <Button type='submit' className='text-[#eee]' onClick={(e) => setStepValidation(prev => prev - 1)}>Previous</Button>}
                        <Button disabled={disabled} type='submit' className={`${disabled ? ' cursor-not-allowed' : 'bg-primary-gradient'} text-[#eee]`} onClick={(e) => onNextHandler(e)}>Next</Button>
                        {stepValidation == 0 && <Button onClick={() => router.push(props.toPath)}>{props.isSignIn ? 'Not a member ?' : 'Already member ?'}</Button>}
                    </ButtonGroup>
                    {
                        props.isSignIn &&
                        <div className='flex justify-around'>
                            <Link className='cursor-pointer' href='/auth/forgotpassword'>Forgot password ?</Link>
                            <Checkbox> Remember me</Checkbox>
                        </div>
                    }
                </form>

            </CardBody>
            <CardFooter className='flex justify-center text-sm'>
                <span>Having a problems ? contact: <Link className='text-foreground cursor-pointer'>{props.description}</Link></span>
            </CardFooter>
        </Card >
    )
}

export default FormCard