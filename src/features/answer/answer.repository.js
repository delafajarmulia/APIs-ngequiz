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