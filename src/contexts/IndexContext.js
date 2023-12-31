import { useReducer, createContext, useContext } from 'react'

const IndexContext = createContext(null)
const IndexDispatchContext = createContext(null)

export function useIndex() {
    return useContext(IndexContext)
}
export function useIndexDispatch() {
    return useContext(IndexDispatchContext)
}

const IndexProvider = ({ children }) => {
    const [state, dispatch] = useReducer(function (state, action) {
        switch (action.type) {
            case "abrir-modal":
                return { ...state, isOpen: true }
            case "cerrar-modal":
                return { ...state, isOpen: false, isEditing: false, pokemonEditing: {} }
            case "get-pokemons":
                return { ...state, pokemons: action.pokemons }
            case 'delete-pokemon':
                let newPokems = state.pokemons.filter((item) => item.id !== action.id);
                return { ...state, pokemons: newPokems };
            case "is-editing":
                return { ...state, isOpen: true, isEditing: action.value, pokemonEditing: action.payload }
            case "create-pokemon":
                return { ...state, pokemons: [...state.pokemons, action.payload] }
            case "update-pokemon":
                const updatedPokemons = state.pokemons.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
                return { ...state, pokemons: updatedPokemons };
            default:
                return state;
        }
    }, { isOpen: false, pokemons: [], isEditing: false, pokemonEditing: undefined })
    return (
        <>
            <IndexContext.Provider value={state}>
                <IndexDispatchContext.Provider value={dispatch}>
                    {children}
                </IndexDispatchContext.Provider>
            </IndexContext.Provider>
        </>
    )
}

export default IndexProvider
