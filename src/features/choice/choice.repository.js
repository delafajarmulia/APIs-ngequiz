import prisma from "../../db/index.js"

export const createChoice = async(newChoice) => {
    const choiceAdded = await prisma.choice.create({
        data:{
            choice: newChoice.choice,
            is_correct: newChoice.is_correct,
            question_id: newChoice.question_id
        }
    })

    return choiceAdded
}

export const getChoicesByQuestionId = async(questionId) => {
    const choices = await prisma.choice.findMany({
        where: {
            question_id: questionId
        },
        select: {
            id: true,
        }
    })

    return choices
}

export const deleteChoiceByQuestionId = async(questionId) => {
    await prisma.choice.deleteMany({
        where: {
            question_id: questionId
        }
    })

    return
}
