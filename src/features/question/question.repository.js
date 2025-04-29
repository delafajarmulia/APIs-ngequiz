import prisma from "../../db/index.js"

export const creatQuestion = async(newQuestion) => {
    const questionAdded = await prisma.question.create({
        data:{
            question: newQuestion.question,
            quiz_id: parseInt(newQuestion.quiz_id)
        }
    })

    return questionAdded
}

export const getQuestionById = async(id) => {
    const question = await prisma.question.findFirst({
        where:{
            id:parseInt(id)
        }
    })

    return question
}