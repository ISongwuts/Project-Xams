'use client'
import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import { Chip } from '@nextui-org/chip'
import { Badge } from '@nextui-org/badge'
import Image from 'next/image'
import ImageModal from './image-modal'
import { useDisclosure } from '@nextui-org/modal'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import { QuestionType } from '@/types'
import RenderChoice from './render-choice'

function CreateQuestionForm() {
  const {
    createData,
    setUpdateTrigger,
    addChoice,
    updateQuestion,
    setCurrentQuestion,
  } = useCreateExaminationStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const formRef = useRef(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const select = ['Single', 'Multiple', 'Single/Image', 'Multiple/Image', 'Subjective', 'True/False', 'Completion']

  const OnQuestionFormSave = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues: any = {} as QuestionType;
    formData.forEach((value, key) => {
      if (key === 'image') {
        formValues[key] = [...(formValues[key] || []), value]
      } else if (key === 'choice' || key === 'score') {
        formValues[key] = [
          ...(formValues[key] || []),
          value
        ]
      } else {
        formValues[key] = value;
      }
    });
    formValues['choices'] = formValues['choice'].map((val: string, index: number) => ({
      desc: val,
      score: formValues['score'][index]
    }))

    delete formValues.choice
    delete formValues.score
    updateQuestion(formValues, createData.current)
  };

  useEffect(() => {
    console.log(createData)
  }, [createData])

  return (
    <Card>
      <form ref={formRef} onSubmit={OnQuestionFormSave} onChange={OnQuestionFormSave} >
        <CardHeader className='pb-0'>
          <div className='flex flex-col w-full gap-4 p-2'>
            <div className='grid grid-cols-4 w-full gap-4'>
              <Select
                name='number'
                className='col-span-1'
                size='sm'
                label='Question'
                variant='bordered'
                defaultSelectedKeys={['0']}
                selectedKeys={[String(createData.current)]}
                onChange={(e) => setCurrentQuestion(Number.parseInt(e.target.value))}
              >
                {
                  Array.from({ length: createData.examinationAmount }).map((_, index) =>
                    <SelectItem key={index} value={index} textValue={String(index + 1)}>Q. {index + 1}</SelectItem>
                  )
                }

              </Select>
              <Select
                name='type'
                className='col-span-3'
                size='sm'
                label='Type'
                variant='bordered'
                selectedKeys={[createData.questions[createData.current].type]}
                onChange={(e) => {
                  createData.questions[createData.current].type = e.target.value
                  setUpdateTrigger(createData.updateTrigger)
                }}
              >
                {select.map((val, index) => <SelectItem key={index} value={val}>{val}</SelectItem>)}
              </Select>

            </div>
            <Input
              name='title'
              variant='bordered'
              size='sm'
              label='Title'
              type='text'
              isRequired
              value={createData.questions[createData.current].title}
            />
            <Textarea
              name='desc'
              minRows={3}
              variant='bordered'
              label='Description'
              value={createData.questions[createData.current].desc}
            />
            <div className='flex items-center justify-between'>
              <input
                name='image'
                type='file'
                accept="image/*"
                multiple
              />
              <div className='flex gap-2'>
                <Button size='sm' className='text-white' color='warning'>Reset</Button>
                <Button size='sm'
                  className='text-white'
                  color='success'
                  onClick={(e) => {
                    addChoice(createData.current)
                  }}
                >
                  Add
                </Button>
              </div>

            </div>

            <div className='grid grid-cols-4 gap-4'>
              {((createData.questions[createData.current].image as any[]) || []).length > 0 &&
                ((createData.questions[createData.current].image as any[])[0]?.type as any !== 'application/octet-stream') &&
                Array.from(createData.questions[createData.current].image).map((file: any, index: number) => (
                  <Badge
                    content='x'
                    key={index}
                    className=' cursor-pointer hover:bg-red-600 hover:text-white'
                    onClick={() => {
                      createData.questions[createData.current].image.splice(index, 1);
                      setUpdateTrigger(createData.updateTrigger);
                    }}
                  >
                    <Chip
                      className='h-full p-2 cursor-pointer hover:border-primary-50'
                      radius='sm'
                      variant="bordered"
                      onClick={() => {
                        onOpen();
                        console.log(index);
                        setSelectedImageIndex(index);
                      }}
                    >
                      <Image src={URL.createObjectURL(file)} alt={file} width={100} height={100} />
                    </Chip>
                  </Badge>
                ))}
            </div>
            {createData.questions[createData.current].image.length > 0 && selectedImageIndex != null &&
              <ImageModal
                isOpen={isOpen} onOpen={onOpenChange}
                imageSource={URL.createObjectURL(createData.questions[createData.current].image[selectedImageIndex])}
              />}
            <Divider />
            <div className='flex flex-col gap-3 w-full'>
              <RenderChoice />
              {createData.questions[createData.current].choices.length === 0 && <span className='text-sm text-center'> - Empty Choice -</span>}
            </div>
            <Divider />
          </div>
        </CardHeader>
        <CardFooter className='flex flex-col gap-4 pb-5'>

          <div className='flex items-center justify-between w-full'>
            <Input
              type='number'
              name='questionScore'
              label='Question Score'
              size='sm'
              variant='bordered'
              className='w-1/4'
              isRequired
              value={String(createData.questions[createData.current].questionScore)}
            >

            </Input>
            <Button type='submit' color='success' className='text-white bg-primary-gradient'>Save Q</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CreateQuestionForm;
