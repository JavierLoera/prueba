import Api from "./axios.config"

export const getAbilities = async () => {
    try {
        const res = await Api.get("/");
        if (res.status !== 200) {
            throw new Error(res.data.message)
        }
        return res.data;
    } catch (error) {
        throw error
    }
}
