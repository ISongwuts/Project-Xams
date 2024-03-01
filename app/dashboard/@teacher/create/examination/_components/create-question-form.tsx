'use client'
import React, { ChangeEvent, useState, useEffect, useRef, FormEvent } from 'react'
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
import { SingleChoiceForm } from './choice-form'
import { ErrorFilledIcon } from '@/components/icons'
import { useCreateExaminationStore } from '@/services/stores/create-examination.store'
import { QuestionType } from '@/types'

function CreateQuestionForm() {
  const { createData, addQuestion, setCurrentQuestion } = useCreateExaminationStore()
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const formRef = useRef(null)
  const [choiceAmount, setChoiceAmount] = useState<React.JSX.Element[]>([
    <SingleChoiceForm index={0} />, <SingleChoiceForm index={1} />, <SingleChoiceForm index={2} />, <SingleChoiceForm index={3} />
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const select = ['1', '2', '3']

  useEffect(() => {
    console.log(imageFiles)
  }, [imageFiles])

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
    addQuestion(formValues)
  };

  useEffect(()=>{
    console.log(createData)
  }, [createData])

  return (
    <Card>
      <form ref={formRef} onSubmit={OnQuestionFormSave}>
        <CardHeader className='pb-0'>
          <div className='flex flex-col w-full gap-4 p-2'>
            <div className='grid grid-cols-4 w-full gap-4'>

              <Select
                name='number'
                className='col-span-1'
                size='sm'
                label='Question'
                variant='bordered'
                selectedKeys={String(createData.current)}
                onChange={(e) => setCurrentQuestion(Number.parseInt(e.target.value))}
              >
                {
                  Array.from({ length: createData.examinationAmount }).map((_, index) =>
                    <SelectItem key={index + 1} value={index} textValue={String(index + 1)}>Q. {index + 1}</SelectItem>
                  )
                }

              </Select>
              <Select
                name='type'
                className='col-span-3'
                size='sm'
                label='Type'
                variant='bordered'>
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
            />
            <Textarea
              name='desc'
              minRows={3}
              variant='bordered'
              label='Description'
            />
            <div className='flex items-center justify-between'>
              <input
                name='image'
                type='file'
                accept="image/*"
                onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => setImageFiles(e.target.files)}
                multiple
              />
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  className='text-white'
                  color='danger'
                  onClick={(e) => setChoiceAmount([])}
                >
                  Clear
                </Button>
                <Button size='sm' className='text-white' color='warning'>Reset</Button>
                <Button size='sm'
                  className='text-white'
                  color='success'
                  onClick={(e) => setChoiceAmount(prev => [...prev, <SingleChoiceForm index={prev.length} />])}
                >
                  Add
                </Button>
              </div>

            </div>

            <div className='grid grid-cols-4 gap-4'>
              {imageFiles && Array.from(imageFiles).map((file, index: number) => (
                <Badge
                  content='x'
                  key={index}
                  className=' cursor-pointer hover:bg-red-600 hover:text-white'
                  onClick={() => {
                    setImageFiles(prev => {
                      const newFileList = Array.from(prev || []);
                      newFileList.splice(index, 1);
                      return newFileList as unknown as FileList;
                    });
                  }}
                >
                  <Chip
                    className='h-full p-2 cursor-pointer hover:border-primary-50'
                    radius='sm'
                    variant="bordered"
                    onClick={() => {
                      onOpen()
                      setSelectedImageIndex(index)
                    }}
                  >
                    <Image src={URL.createObjectURL(file)} alt={file.name} width={100} height={100} />
                  </Chip>
                </Badge>
              ))}
            </div>
            {imageFiles && selectedImageIndex != null &&
              <ImageModal
                isOpen={isOpen} onOpen={onOpenChange}
                imageSource={URL.createObjectURL(imageFiles[selectedImageIndex])}
                alt={imageFiles[selectedImageIndex].name}
              />}
            <Divider />
            <div className='flex flex-col gap-3 w-full'>

              {choiceAmount.map((element, index: number) => (
                <div key={index} className='flex items-center gap-3 w-full'>
                  {element}
                  {index + 1 == choiceAmount.length && <Button
                    isIconOnly
                    size='sm'
                    color='danger'
                    onClick={(e) => setChoiceAmount(prev => prev.filter((_, idx) => idx !== index))}
                    className='p-0 m-0'
                  ><ErrorFilledIcon size={20} /></Button>}
                </div>
              ))}
              {choiceAmount.length === 0 && <span className='text-sm text-center'> - Empty Choice -</span>}
            </div>
            <Divider />
          </div>
        </CardHeader>
        <CardFooter className='flex flex-col gap-4 pb-5'>

          <div className='flex items-center justify-between w-full'>
            <Input type='number' name='question_score' label='Totally Score' size='sm' variant='bordered' className='w-1/4' isRequired></Input>
            <Button type='submit' color='success' className='text-white bg-primary-gradient'>Save Q</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CreateQuestionForm;
