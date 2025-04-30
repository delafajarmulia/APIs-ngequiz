import prisma from "../../db/index.js"

export const createChoice = async(newChoice) => {
    const choiceAdded = await prisma.choice.createMany({
        data: newChoice
    })

    return choiceAdded
}