import prisma from '../../db/index.js'

export const createQuiz = async(creatorId, newQuiz) => {
    const quizAdded = await prisma.quiz.create({
        data:{
            title: newQuiz.title,
            description: newQuiz.description,
            is_once: newQuiz.is_once,
            created_by: creatorId
        }
    })

    return quizAdded
}

export const getQuizById = async(id) => {
    const quizResult = await prisma.quiz.findFirst({
        where: {
            id: id
        },
        include:{
            questions:{
                include:{
                    choices: true
                }
            }
        }
    })

    return quizResult
}

export const getAllQuiz = async() => {
    const quizzes = await prisma.quiz.findMany({
        include:{
            creator:{
                select: {
                    name:true
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
    })

    return quizzes
}

export const getMyQuiz = async(userId) => {
    const quizzes = await prisma.quiz.findMany({
        where: {
            created_by: userId
        },
        include: {
            _count: {
                select: {
                    questions: true
                }
            }
        }
    })

    return quizzes
}

export const getAllQuizName = async() => {
    const quizzes = await prisma.quiz.findMany({
        select: {
            id: true,
            title: true
        }
    })

    return quizzes
}

export const getQuizIdAndCreator = async(quizId) => {
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: quizId
        },
        select: {
            id: true,
            created_by: true
        }
    })

    return quiz
}

export const deleteQuiz = async(quizId) => {
    await prisma.quiz.delete({
        where: {
            id: quizId
        }
    })

    return
}

export const getQuizNameById = async(id) => {
    const quizName = await prisma.quiz.findUnique({
        where: {
            id
        }, 
        select: {
            id: true,
            title: true
        }
    })
    return quizName
}