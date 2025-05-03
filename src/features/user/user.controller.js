import { response } from "../../utils/response.js"
import { getUserByID } from "./user.repository.js"

export const findMe = async(req, res) => {
    const id = parseInt(req.user.id)
    const user = await getUserByID(id)
    return response(200, user, 'Get me', res)
}