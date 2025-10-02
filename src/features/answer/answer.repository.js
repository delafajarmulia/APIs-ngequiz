import prisma from "../../db/index.js"

export const createAnswer = async(data) => {
    const answerAdded = await prisma.answer.create({
        data:{
            user_id: data.user_id,
            choice_id: data.choice_id,
            result_id: data.result_id
        }
    })

    return answerAdded
}

export const getUserAnswer = async(resultId) => {
    const userAnswer = await prisma.answer.findMany({
        where: {
            result_id: resultId
        },
        include: {
            choice: {
                include: {
                    question: true
                }
            }
        }
    })

    return userAnswer
}

export const deleteAnswerByChoiceId = async(choiceId) => {
    await prisma.answer.deleteMany({
        where: {
            choice_id: choiceId
        }
    })
    return
}