import prisma from "../../db/index.js"

export const createChoice = async(newChoice) => {
    const choiceAdded = await prisma.choice.create({
        data:{
            choice: newChoice.choice,
            is_correct: newChoice.is_correct === 'true',
            question_id: parseInt(newChoice.question_id)
        }
    })

    return choiceAdded
}