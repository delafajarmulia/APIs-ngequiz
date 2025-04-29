import { response } from "../../utils/response.js"
import { getQuizById } from "../quiz/quiz.repository.js"
import { creatQuestion } from "./question.repository.js"

export const makeQuestion = async(req, res) => {
    try {
        const newQuestion = req.body 
        const quizId = parseInt(newQuestion.quiz_id)

        const quizAvailabled = await getQuizById(quizId)
        if(!quizAvailabled){
            return response(404, [], 'Quiz not found', res)
        }

        const questionAdded = await creatQuestion(newQuestion)

        return response(200, questionAdded, 'Successfully add new question', res)
    } catch (error) {
        return res.send(error)
    }
}