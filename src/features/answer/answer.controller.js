import { validationResult } from "express-validator"
import { response } from "../../utils/response.js"
import { getQuestionByIdAndChoice } from "../question/question.repository.js"
import { createAnswer, getUserAnswer } from "./answer.repository.js"
import { changeResult } from "../result/result.controller.js"

export const submitAnswer = async(req, res) => {
    const userId = parseInt(req.user.id)
    let { question_id, choice_id, result_id } = req.body 

    question_id = parseInt(question_id)
    choice_id = parseInt(choice_id)
    result_id = parseInt(result_id)

    const isErrorValidation = validationResult(req)
    if(!isErrorValidation.isEmpty()){
        return response(422, isErrorValidation.array(), 'Validation error', res)
    }

    const isQuestionAndChoiceAvailabled = await getQuestionByIdAndChoice(question_id, choice_id)

    if(!isQuestionAndChoiceAvailabled || isQuestionAndChoiceAvailabled.choices.length < 1){
        return response(404, [], 'Question or Choice not found', res)
    }

    const data = {
        user_id: userId,
        choice_id,
        result_id
    }

    const answerCreated = await createAnswer(data)

    const updatedScore = await changeResult(req, res)

    return
}

export const userAnswer = async(req, res) => {
    // const userId = parseInt(req.user.id)
    // const quizId = parseInt(req.params.quizId)

    // const answers = await getUserAnswer(quizId, userId)
    // const id = parseInt(req.params.id)

    const resultId = parseInt(req.params.resultId)
    
    const answers = await getUserAnswer(resultId)

    return response(200, answers, 'Get user answer by quiz id', res)
}