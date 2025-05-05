import prisma from "../../db/index.js"

export const getUserByID = async(id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }, 
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    return user
}