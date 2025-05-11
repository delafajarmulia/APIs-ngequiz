import prisma from "../../db/index.js"

export const createResult = async(data) => {
    const resultAdded = await prisma.result.create({
        data: data
    })

    return resultAdded
}