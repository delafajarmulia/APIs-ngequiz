import prisma from "../../db/index.js"

export const createResult = async(data) => {
    const resultAdded = await prisma.result.create({
        data: data
    })

    return resultAdded
}

export const myResult = async(userId) => {
    const datas = await prisma.result.findMany({
        where: {
            user_id: userId
        },
        include: {
            quiz: true
        }
    })

    return datas
}

export const getResultByQuizId = async(quizId) => {
    const datas = await prisma.result.findMany({
        where: {
            quiz_id: quizId
        },
        include: {
            user: true
        },
        orderBy: {
            score: 'desc'
        }
    })

    return datas
}