import { response } from "../../utils/response.js"
import { getQuestionById } from "../question/question.repository.js"
import { createChoice } from "./choice.repository.js"

export const makeChoice = async(req, res) => {
    try {
        const newChoice = req.body
        const questionAvailabled = await getQuestionById(parseInt(newChoice.question_id))

        if(!questionAvailabled){
            return response(404, [], 'Quiz not found', res)
        }

        const choiceAdded = await createChoice(newChoice)
        
        return response(200, choiceAdded, 'Adding new choice', res)       
    } catch (error) {
        return res.send(error)
    }
}