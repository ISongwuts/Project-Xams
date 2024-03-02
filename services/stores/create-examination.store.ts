import { QuestionType } from "@/types"
import { create } from "zustand"

/* Use it when creating examination */
interface ExaminationType {
    examinationName: string,
    examinationAmount: number,
    creator: string,
    status: string
    questions: [
        {
            number: number,
            type: string,
            title: string,
            desc: string,
            image: [],
            choices: {
                desc: string,
                score: number
            }[],
            questionScore: number
        }
    ] | [],
    totalScore: number
    current: number,
    updateTrigger: number,
}

interface ExaminationActionType {
    createData: ExaminationType,
    setExaminationName: (name: string) => void,
    setExaminationAmount: (amount: number) => void,
    setCreator: (creator: string) => void,
    setStatus: (status: string) => void,
    setUpdateTrigger: (prev: number) => void,   
    setCurrentQuestion: (curr: number) => void,
    addQuestion: () => void,
    addChoice: (current: number) => void,
    updateQuestion: (question: QuestionType, index: number) => void,
}

export const useCreateExaminationStore = create<ExaminationActionType>((set) => ({
    createData: {
        examinationName: '',
        examinationAmount: 0,
        creator: '',
        status: '',
        questions: [{
            number: 1,
            type: '0',
            title: '',
            desc: '',
            image: [],
            choices: Array.from({ length: 4 }, () => ({ desc: '', score: 0 })),
            questionScore: 0
        }],
        totalScore: 0,
        current: 0,
        updateTrigger: 0
    },
    setExaminationName: (name: string) => set(state => ({ createData: { ...state.createData, examinationName: name } })),
    setExaminationAmount: (amount: number) => set(state => ({ createData: { ...state.createData, examinationAmount: amount } })),
    setCreator: (creator: string) => set(state => ({ createData: { ...state.createData, creator } })),
    setStatus: (status: string) => set(state => ({ createData: { ...state.createData, status } })),
    setUpdateTrigger: (prev: number) => set(state => ({ createData: { ...state.createData, updateTrigger: prev + 1 } })),
    setCurrentQuestion: (curr: number) => set(state => ({ createData: { ...state.createData, current: curr } })),
    addQuestion: () => set((state:any) => ({
        createData: {
            ...state.createData,
            questions: [
                ...state.createData.questions,
                {
                    number: state.createData.questions.length + 1,
                    type: '0',
                    title: '',
                    desc: '',
                    image: [],
                    choices: Array.from({ length: 4 }, () => ({ desc: '', score: 0 })),
                    questionScore: 0
                }
            ]
        }
    })),
    addChoice: (current: number) => set((state:any) => ({
        createData: {
            ...state.createData,
            questions: state.createData.questions.map((item:any, i:number) =>
                i === current ? { ...item, choices: [...item.choices, { desc: '', score: 0 }] } : item
            )
        }
    })),
    updateQuestion: (question: QuestionType, index: number) => set((state:any) => ({
        createData: {
            ...state.createData,
            questions: state.createData.questions.map((item:any, i:number) =>
                i === index ? { ...question } : item
            )
        }
    }))
}))

/* Use it when creating question */