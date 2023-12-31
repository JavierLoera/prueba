import Api from "./axios-config"

export const getAllPokemons = async () => {
    try {
        const res = await Api.get("/");
        return res;
    } catch (error) {
        throw error
    }
}


export const createPokemon = async (data) => {
    try {
        const res = await Api.post("/", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return res
    } catch (error) {
        throw error
    }
}


export const deletePokemonRequest = async (id) => {
    try {
        const res = await Api.delete("/" + id)
        return res
    } catch (error) {
        throw error
    }
}

export const getOnePokemon = async (id) => {
    try {
        const res = await Api.get("/" + id)
        return res
    } catch (error) {
        throw error
    }
}

export const updatePokemon = async (id, data) => {
    try {
        const res = await Api.put("/" + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        throw error
    }
}