import prisma from "../../db/index.js"

export const createAnswer = async(data) => {
    const answerAdded = await prisma.answer.create({
        data:{
            user_id: data.user_id,
            question_id: data.question_id,
            choice_id: data.choice_id
        }
    })

    return answerAdded
}

export const getUserAnswer = async(quiz_id, user_id) => {
    const userAnswers = await prisma.answer.findMany({
        where:{
            user_id,
            question: {
                quiz_id: quiz_id
            }
        },
        include: {
            question: {
                select: {
                    quiz_id: true
                }
            }
        }
    })

    return userAnswers
}