import { response } from "../../utils/response.js"
import { getUserAnswer } from "../answer/answer.repository.js"
import { getQuestionCountByQuizId } from "../question/question.repository.js"
import { getQuizById } from "../quiz/quiz.repository.js"
import { createResult, getResultById, getResultByQuizId, getUserScoreById, myResult, updateResult } from "./result.repository.js"

// make result cuma buat initialisasi resultnya aja, pointnya nanti di update result
export const makeResult = async(req, res) => {
    const userId = parseInt(req.user.id)
    const quizId = parseInt(req.body.quiz_id)
    
    const data = {
        score: 0,
        user_id: userId,
        quiz_id: quizId,
        submitted_at: new Date()
    }

    const resultAdded = await createResult(data)
    return response(201, resultAdded, 'Successfully add score', res)
}

export const changeResult = async(req, res) => {
    const resultId = parseInt(req.body.result_id)
    const choiceId = parseInt(req.body.choice_id)
    const questionId = parseInt(req.body.question_id)

    const result = await getResultById(resultId, questionId) // 42 = questionId

    let isCorrect = 0

    result.quiz.questions.map(ques => {
        isCorrect = ques.choices.find(choice => choice.is_correct === true)

        isCorrect.id === choiceId ? isCorrect = 1 : isCorrect = 0 
    })

    let data
    const quizId = parseInt(result.quiz_id)

    if(isCorrect === 1){
        const point = await pointCount(quizId)
    
        data = {
            score: result.score + point,
            submitted_at: new Date()
        }
    } else {
        data = {
            score: result.score,
            submitted_at: new Date()
        }
    }

    const resultUpdated = await updateResult(resultId, data)

    const update = {
        score: resultUpdated.score,
        is_correct: isCorrect === 1 ? true : false
    }

    return response(201, update, 'Successfully update score', res)
}

const pointCount = async(quizId) => {
    let questionCount = await getQuestionCountByQuizId(quizId)
    questionCount = questionCount._count.questions

    const point = Number((100 / questionCount).toFixed(2))

    return point
}

export const resultMyQuizDone = async(req, res) => {
    const userId = parseInt(req.user.id)

    const myResults = await myResult(userId)
    
    if(myResults.length < 1){
        return response(404, [], 'You never try Quiz yet', res)
    }

    return response(200, myResults, 'Get your quiz done', res)
}

export const resultById = async(req, res) => {
    const resultId = parseInt(req.params.id)

    const quizAvailabled = await getQuizById(resultId)
    if(!quizAvailabled){
        return response(404, [], 'Quiz not found', res)
    }

    const datas = await getResultById(resultId)
    // if(datas.length < 1){
    //     return response(404, [], 'no one has done this quiz yet', res)
    // }

    return response(200, datas, 'Get result by quiz id', res)
}

export const resultByQuizId = async(req, res) => {
    const quizId = parseInt(req.params.id)

    const quizAvailabled = await getResultByQuizId(quizId)

    if(quizAvailabled.length < 1){
        return response(404, [], 'no one has done this quiz yet', res)
    } else {
        return response(200, quizAvailabled, 'Get result by quiz id', res)
    }
}

export const userScore = async(req, res) => {
    const userId = parseInt(req.user.id)
    const resultId = parseInt(req.params.id)

    const score = await getUserScoreById(userId, resultId)

    if(!score){
        return response(404, {}, 'Result not found', res)
    } else {
        return response(200, score, 'Get your score', res)
    }
}