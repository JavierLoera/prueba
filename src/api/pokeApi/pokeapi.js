import Api from "./axios-config"


export const getCharacters = async (limit, page) => {
    try {
        const res = await Api.get(`/?limit=${limit}&&page=${page}`)
        return res
    } catch (error) {
        throw error
    }
}