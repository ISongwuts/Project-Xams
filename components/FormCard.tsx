'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import Image, { StaticImageData } from 'next/image'
import { Divider } from '@nextui-org/divider'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Checkbox } from '@nextui-org/checkbox'
import { useRouter } from 'next/navigation'
import { Slide, FadeIn } from './animation/animation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'
import authAction from '@/action/form-action.auth'
import { RadioGroup } from '@nextui-org/radio'
import { CustomRadio } from './custom/CustomRadio'
import { cn } from '@nextui-org/system'
import { Select, SelectItem } from '@nextui-org/select'

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
    const prefixs = ['นาย', 'นาง', 'นางสาว']
    return (
        <Card className=' bg-background w-full'>
            <CardHeader className='flex justify-center text-2xl font-bold'><span>{props.title}</span></CardHeader>
            <CardBody className={`flex flex-row max-sm:flex-col gap-6 ${props.isSignIn ? 'flex-row-reverse' : null}`}>
                <Slide isSignIn={props.isSignIn}>
                    <Card className='bg-primary-gradient'>
                        <CardHeader><span>XAMS</span></CardHeader>
                        <CardBody className='flex flex-col items-center py-4 px-8 gap-4'>
                            <span className='text-3xl font-bold'>{props.sideCard.cardTitle}</span>
                            <Divider />
                            <p className='text-sm indent-8'>{props.sideCard.cardDescription}</p>
                        </CardBody>
                        <CardFooter className='flex justify-center'>
                            <Image width={250} height={250} src={props.sideCard.cardImage} alt='Book image' />
                        </CardFooter>
                    </Card>
                </Slide>

                <FadeIn>
                    {!props.isSignIn &&
                        <RadioGroup orientation='horizontal'
                            className={cn(
                                'flex flex-row justify-center w-full'
                            )}>
                            <CustomRadio value='student' description="Your role is student!.">Student</CustomRadio>
                            <CustomRadio value='teacher' description="Your role is teacher!.">Teacher</CustomRadio>
                        </RadioGroup>
                    }
                    <form action="" onSubmit={handleSubmit(authAction)} className='w-full flex flex-col gap-2 justify-center px-8'>
                        {
                            props.form.map((attribute, index) => (
                                attribute.label === 'Prefix' ?
                                    <Select variant='underlined' placeholder='Choose your prefix.'>
                                        {
                                            prefixs.map((prefix, index) => <SelectItem key={index} value={prefix}>{prefix}</SelectItem>)
                                        }
                                    </Select>
                                    :
                                    attribute.label === 'Full Name' ?
                                        <div className='flex gap-4'>
                                            <Input
                                                key={index}
                                                errorMessage={errors['first_name'] ? String(errors['first_name']?.message) : ''}
                                                {...register('first_name')}
                                                label='First Name'
                                                type='text'
                                                variant='underlined'
                                            />
                                            <Input
                                                key={index}
                                                errorMessage={errors['last_name'] ? String(errors['last_name']?.message) : ''}
                                                {...register('last_name')}
                                                label='Last Name'
                                                type='text'
                                                variant='underlined'
                                            />
                                        </div>
                                        :
                                        <Input
                                            key={index}
                                            errorMessage={errors[attribute.name] ? String(errors[attribute.name]?.message) : ''}
                                            {...register(attribute.name)}
                                            {...attribute}
                                            variant='underlined'
                                        />
                            ))
                        }
                        <ButtonGroup className='my-4'>
                            <Button type='submit' className=' bg-primary-gradient text-[#eee]'>{props.isSignIn ? 'Sign In' : 'Sign Up'}</Button>
                            <Divider orientation='vertical' className=' bg-green-950 ' />
                            <Button onClick={() => router.push(props.toPath)}>{props.isSignIn ? 'Not a member ?' : 'Already member ?'}</Button>
                        </ButtonGroup>
                        {
                            props.isSignIn &&
                            <div className='flex justify-around'>
                                <Link className='cursor-pointer' href='/auth/forgotpassword'>Forgot password ?</Link>
                                <Checkbox> Remember me</Checkbox>
                            </div>

                        }
                    </form>
                </FadeIn>

            </CardBody>
            <CardFooter className='flex justify-center text-sm'>
                <span>Having a problems ? contact: <Link className='text-foreground cursor-pointer'>{props.description}</Link></span>
            </CardFooter>
        </Card >
    )
}

export default FormCard