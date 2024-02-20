import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

interface PropsType {
    image: StaticImageData,
    title: string,
    content: string[],
    width: number,
    height: number,
}

function ServiceCard(props: PropsType) {
    return (
        <Card className=' w-[20%] max-sm:w-full bg-background hover:border-primary border dark:border-background dark:hover:border-primary cursor-pointer'>
            <CardHeader className='flex flex-col gap-6'>
                <span>{props.title}</span>
                <Image className=' pointer-events-none' width={props.width} height={props.height} src={props.image} alt="service image" />

            </CardHeader>
            <CardBody>
                <p>Services</p>
                <ul className=' list-disc list-inside text-sm indent-3'>
                    {props.content.map((service, index) => (
                        <li key={index}>{service}</li>
                    ))}
                </ul>
            </CardBody>
            <CardFooter className='flex justify-center'>
                <Button className='bg-primary-gradient text-[#eee]'>Visit</Button>
            </CardFooter>
        </Card>
    )
}

export default ServiceCard