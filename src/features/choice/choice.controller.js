import { validationResult } from "express-validator"
import { response } from "../../utils/response.js"
import { getQuestionById } from "../question/question.repository.js"
import { createChoice } from "./choice.repository.js"

export const makeChoice = async(req, res) => {
    try {   

        const { data } = req.body 
        const questionAvailabled = await getQuestionById(data[0].question_id)

        if(!questionAvailabled){
            return response(404, [], 'Quiz not found', res)
        }

        const isErrorValidation = validationResult(req)
        if(!isErrorValidation.isEmpty()){
            return response(422, isErrorValidation.array(), 'Validation error', res)
        }

        const normalizedData = data.map(choice => ({
            choice: choice.choice,
            is_correct: choice.is_correct === true || choice.is_correct === 'true',
            question_id: parseInt(choice.question_id)
        }))

        const choiceAdded = await createChoice(normalizedData)
        console.log(choiceAdded)
        return response(200, choiceAdded, 'Adding new choice', res) 
    } catch (error) {
        return res.send(error)
    }
}