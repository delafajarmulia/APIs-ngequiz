import prisma from "../../db/index.js"

export const creatQuestion = async(newQuestion) => {
    const questionAdded = await prisma.question.createMany({
        data: newQuestion
    })

    return questionAdded
}

export const getQuestionById = async(id) => {
    const question = await prisma.question.findFirst({
        where:{
            id:parseInt(id)
        }
    })

    return question
}

// export const getAllQuestion = async() => {
//     // const questions = await prisma.question.findMany({
//     //     include:{
//     //         users: true
//     //     }
//     // })

//     const questions = await prisma.question.findMany({
//         include:{
//             quiz: true
//         }
//     })

//     return questions
// }