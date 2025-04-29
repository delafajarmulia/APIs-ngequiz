import { response } from "../../utils/response.js"
import { validationResult } from "express-validator"
import { createQuiz } from "./quiz.repository.js"

export const makeQuiz = async(req, res) => {
    try {
        const newQuiz = req.body
        const userId = parseInt(req.user.id) // dapet dari authenticated token)

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Validation error', res)
        }

        const quizAdded = await createQuiz(userId, newQuiz)

        return response(200, quizAdded, "Successfully add new quiz", res)
    } catch (error) {
        return res.send(error)
    }
}