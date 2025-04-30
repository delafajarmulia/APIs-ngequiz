import { validationResult } from "express-validator"
import { response } from "../../utils/response.js"
import { getQuizById } from "../quiz/quiz.repository.js"
import { creatQuestion } from "./question.repository.js"

export const makeQuestion = async(req, res) => {
    try {
        const { data } = req.body
        const quizId = parseInt(data[0].quiz_id)
        
        if(!Array.isArray(data)){
            return response(400, [], 'Data must be an array', res)
        }

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Error validation', res)
        }

        const quizAvailabled = await getQuizById(quizId)
        if(!quizAvailabled){
            return response(404, [], 'Quiz not found', res)
        }

        const questionAdded = await creatQuestion(data)

        return response(200, questionAdded, 'Successfully add new question', res)
    } catch (error) {
        return res.send(error)
    }
}