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

export const getResultById = async(resultId, questionId) => {
    const result = await prisma.result.findFirst({
        where: {
            id: resultId
        }, 
        include: {
            quiz: {
                include: {
                    questions: {
                        where: {
                            id: questionId
                        },
                        include: {
                            choices: true
                        }
                    }
                }
            },
        }
    })

    return result
}

export const getResultByQuizId = async(quizId) => {
    const datas = await prisma.result.findMany({
        where: {
            quiz_id: quizId
        },
        select: {
            score: true,
            user: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            score: 'desc'
        }, 
    })

    return datas
}

export const updateResult = async(resultId, data) => {
    const result = await prisma.result.update({
        where: {
            id: resultId
        },
        data: {
            score: data.score,
            submitted_at: data.submitted_at
        }
    })

    return result
}

export const deleteResultByQuizId = async(quizId) => {
    await prisma.result.deleteMany({
        where: {
            quiz_id: quizId
        }
    })

    return
}

export const getUserScoreById = async(userId, resultId) => {
    const data = await prisma.result.findFirst({
        where: {
            id: resultId,
            user_id: userId
        },
        select: {
            id: true,
            score: true,
        }
    })

    return data
}