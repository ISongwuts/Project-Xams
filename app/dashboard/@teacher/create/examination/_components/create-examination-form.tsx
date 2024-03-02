import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { RadioGroup, Radio } from '@nextui-org/radio'
import { Input } from '@nextui-org/input'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import React from 'react'

function CreateExaminationForm() {
    const {
        createData,
        setExaminationName,
        setExaminationAmount,
        setCreator,
        setStatus,
        setCurrentQuestion,
        addQuestion,
    } = useCreateExaminationStore()

    const onQuestionAdding = (value: string) => {
        const amount = Number.parseInt(value);
        const questionLength = createData.questions.length
        if (amount > questionLength) {
            for (let i: number = 0; i < (amount - questionLength); i++) {
                addQuestion();
            }
        }else{
            for (let i: number = 0; i < (questionLength - amount); i++) {
                createData.questions.pop();
            }
        }
        setExaminationAmount(amount);
    }

    return (
        <div className='flex flex-col gap-8'>
            <Card className='h-fit sticky'>
                <CardBody className='pb-0'>
                    <div className='flex flex-col gap-4 w-full p-2'>
                        <p className='font-bold text-lg'>Create Examination</p>
                        <Input
                            label='Examination Name'
                            variant='bordered'
                            onValueChange={setExaminationName}
                        />
                        <div className='flex gap-4'>
                            <Input
                                label='Examination Amount'
                                variant='bordered'
                                type='number'
                                defaultValue='0'
                                min={0}
                                onValueChange={(value) => onQuestionAdding(value)}
                            />
                            <Input
                                variant='bordered'
                                label='Creator'
                                type='text'
                                readOnly
                                value='@ISongwut'
                                onValueChange={setCreator}
                            />
                        </div>
                        <Divider />
                    </div>

                </CardBody>
                <CardFooter className='pt-0'>
                    <div className='flex justify-between w-full p-2'>
                        <div className='flex items-center'>
                            <RadioGroup
                                orientation="horizontal"
                                defaultValue='private'
                                onValueChange={setStatus}
                            >
                                <Radio value="private">Private</Radio>
                                <Radio value="publish">Publish</Radio>
                            </RadioGroup>
                        </div>
                        <div className='flex gap-3'>
                            <Button className='w-[100px]'>Cancel</Button>
                            <Button className='w-[100px] bg-primary-gradient text-white'>Save</Button>
                        </div>

                    </div>
                </CardFooter>
            </Card>
            <Card className={` ${createData.examinationAmount > 0 ? 'w-fit' : 'w-full'}`}>
                <CardBody >
                    <div className={`flex flex-wrap max-sm:grid-cols-8 gap-4 p-2 ${createData.examinationAmount <= 0 && 'justify-center'}`}>
                        {createData.examinationAmount > 0 ?
                            Array.from({ length: createData.examinationAmount }).map((_, index) =>
                                <Button key={index} className={`${createData.current == index && 'bg-primary-gradient text-white'}`} size='sm' isIconOnly onPress={(e) => setCurrentQuestion(index)}>{index + 1}</Button>
                            ) : <span className='text-center'>Empty Navigation</span>
                        }
                    </div>
                </CardBody>
            </Card>
        </div>

    )
}

export default CreateExaminationForm