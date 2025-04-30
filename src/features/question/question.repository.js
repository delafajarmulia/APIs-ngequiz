import prisma from "../../db/index.js"

export const creatQuestion = async(newQuestion) => {
    const questionAdded = await prisma.question.createMany({
        data: newQuestion
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