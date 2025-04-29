export const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            datas: data,
            message
        }
    })
}