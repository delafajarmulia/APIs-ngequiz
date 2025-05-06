import { validationResult } from "express-validator"
import { response } from "../../utils/response.js"
import { getQuizById } from "../quiz/quiz.repository.js"
import { createQuestion, createChoice } from "./question.repository.js"

export const makeQuestion = async(req, res) => {
    try {
        const { data }  = req.body
        const quizId = parseInt(data[0].quiz_id)
        const userId = parseInt(req.user.id)

        const quizAvailabled = await getQuizById(quizId)
        if(!quizAvailabled){
            return response(404, [], 'Quiz not found', res)
        }

        if(quizAvailabled.created_by !== userId){
            return response(401, [], 'Youre not creator', res)
        }
        
        if(!Array.isArray(data)){
            return response(400, [], 'Data must be an array', res)
        }

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Error validation', res)
        }

        const normalizedData = data.map(question => ({
            question: question.question,
            quiz_id: parseInt(question.quiz_id),
            choices: question.choices.map(choice => ({
                choice: choice.choice,
                is_correct: choice.is_correct === true || choice.is_correct === 'true'
            }))
        }))

        // res.send(normalizedData)
        for (const question of normalizedData) {
            const createdQuestion = await createQuestion(question)
            
            for (const choice of question.choices) {
                await createChoice({
                    ...choice,
                    question_id: parseInt(createdQuestion.id)
                })
            }
        }

        return response(200, normalizedData, 'Successfully add new question', res)
    } catch (error) {
        return res.send(error)
    }
}

// export const seeAllQuestion = async(req, res) => {
//     try {
//         const questions = await getAllQuestion()

//         if(!questions){
//             return response(404, [], 'Question not available', res)
//         }

//         return response(200, questions, 'See all question', res)
//     } catch (error) {
//         return res.send(error)
//     }
// }