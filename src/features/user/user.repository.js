import prisma from "../../db/index.js"

export const getUserByID = async(id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }, 
        select: {
            id: true
        }
    })

    return user
}