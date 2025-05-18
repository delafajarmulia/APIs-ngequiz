import { response } from "../../utils/response.js"
import { validationResult } from "express-validator"
import { createQuiz, getAllQuiz, getAllQuizName, getMyQuiz, getQuizById } from "./quiz.repository.js"
import { myResult } from "../result/result.repository.js"

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

export const takeQuiz = async(req, res) => {
    const id = parseInt(req.params.id)
    const quiz = await getQuizById(id)

    if(!quiz){
        return response(404, [], 'Quiz not found', res)
    }
    return response(200, quiz, 'Get quiz by ID', res)
}

export const seeAllQuiz = async(req, res) => {
    const userId = parseInt(req.user.id)
    const quizzes = await getAllQuiz()
    let datas = []

    if(!quizzes){
        return response(404, [], 'Quiz not found', res)
    }

    const myResults = await myResult(userId)
    const userResults = new Map()
    myResults.map(result => userResults.set(result.quiz_id, result.quiz_id))

    for (const quiz of quizzes) {
        const selectedUserResult = userResults.get(quiz.id)

        if(!selectedUserResult){
            datas.push(quiz)
        } else if (!quiz.is_once){
            datas.push(quiz)
        }
    }

    return response(200, datas, 'Get all quiz', res)
}

export const takeMyQuiz = async(req, res) => {
    const me = parseInt(req.user.id)
    const quizzes = await getMyQuiz(me)

    if(quizzes.length < 1){
        return response(404, [], 'Your Quiz Not Found', res)
    }
    return response(200, quizzes, 'Get all your quiz', res)
}

export const seeAllQuizName = async(req, res) => {
    const quizzes = await getAllQuizName()

    if(quizzes.length < 1){
        return response(404, [], 'Quiz Not Found', res)
    }
    return response(200, quizzes, 'Get all quiz name', res)
}