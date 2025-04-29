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