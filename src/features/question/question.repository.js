import prisma from "../../db/index.js"

export const createQuestion = async(newQuestion) => {
    const questionAdded = await prisma.question.create({
        data: {
            question: newQuestion.question,
            quiz_id: newQuestion.quiz_id
        }
    })

    return questionAdded
}

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