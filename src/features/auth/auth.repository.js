import prisma from "../../db/index.js";

export const getUserByEmail = async(email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            email: true,
            password: true,
            role:true
        }
    })

    return user
}

export const createNewUser = async(passwordHashing, newUser) => {
    const userAdded = await prisma.user.create({
        data: {
            name: newUser.name,
            email: newUser.email,
            password: passwordHashing,
            role: newUser.role ? newUser.role : 'user',
        }
    })

    return userAdded
}