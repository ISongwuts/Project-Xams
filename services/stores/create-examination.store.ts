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
            choices: [{
                desc: string,
                score: number
            }],
            questionScore: number
        }
    ] | [],
    totalScore: number
    current: number
}

interface ExaminationActionType {
    createData: ExaminationType,
    setExaminationName: (name: string) => void,
    setExaminationAmount: (amount: number) => void,
    setCreator: (creator: string) => void,
    setStatus: (status: string) => void,
    setCurrentQuestion: (curr: number) => void
    addQuestion: (question: QuestionType) => void
}

export const useCreateExaminationStore = create<ExaminationActionType>(set => ({
    createData: {
        examinationName: '',
        examinationAmount: 0,
        creator: '',
        status: '',
        questions: [],
        totalScore: 0,
        current: 1
    },
    setExaminationName: (name: string) => set(state => ({
        createData: { ...state.createData, examinationName: name }
    })),
    setExaminationAmount: (amount: number) => set(state => ({
        createData: { ...state.createData, examinationAmount: amount }
    })),
    setCreator: (creator: string) => set(state => ({
        createData: { ...state.createData, creator: creator }
    })),
    setStatus: (status: string) => set(state => ({
        createData: { ...state.createData, status: status }
    })),
    setCurrentQuestion: (curr: number) => set(state => ({
        createData: { ...state.createData, current: curr}
    })),
    addQuestion: (question: QuestionType) => set((state: any) => ({
        createData: {
            ...state.createData, 
            questions: [...state.createData.questions, {
                number: question.number,
                type: question.type,
                title: question.title,
                desc: question.desc,
                image: [],
                choices: [...question.choices],
                questionScore: question.questionScore
            }]
        }
    }))
}))
/* Use it when creating question */