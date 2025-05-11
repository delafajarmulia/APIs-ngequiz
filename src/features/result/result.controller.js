import { response } from "../../utils/response.js"
import { getUserAnswer } from "../answer/answer.repository.js"
import { getQuizById } from "../quiz/quiz.repository.js"
import { createResult } from "./result.repository.js"

export const makeResult = async(req, res) => {
    const userId = parseInt(req.user.id)
    const quizId = parseInt(req.body.quiz_id)
    let answerCorrect = 0

    const quiz = await getQuizById(quizId)
    if(!quiz){
        return response(404, [], 'Quiz not found', res)
    }

    const questions = quiz.questions
    const questionCount = questions.length

    const userAnswer = await getUserAnswer(quizId, userId)

    if(userAnswer.length < 1){
        return response(404, [], 'User dont play this quiz', res)
    }

    const userAnswerMap = new Map()
    for (const answer of userAnswer) {
        // set untuk map yang menyimpan key: value, spt dictionary
        userAnswerMap.set(answer.question_id, answer.choice_id)
    }

    for (const question of questions) {
        // iniMap.get(..) -> ambil value berdasarkan key
        const selectedChoiceId = userAnswerMap.get(question.id)
        
        // array.some(..) -> untuk return boolean
        const correct = question.choices.some(choice => 
            choice.id === selectedChoiceId && choice.is_correct
        )

        if(correct) answerCorrect++
    }

    let score = answerCorrect / questionCount * 100
    score = Number.isInteger(score) ? score : parseFloat(score.toFixed(2))

    const data = {
        score,
        submitted_at: new Date(),
        user_id: userId,
        quiz_id: quizId
    }

    const resultAdded = await createResult(data)
    return response(201, resultAdded, 'Successfully add score', res)
}