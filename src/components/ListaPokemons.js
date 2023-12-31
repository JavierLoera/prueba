import { useEffect } from 'react'
import { deletePokemonRequest, getOnePokemon, getAllPokemons } from '../api/pokemon/pokemon'
import { useIndex, useIndexDispatch } from '../contexts/IndexContext';
import { ToastContainer, toast } from 'react-toastify';
import Card from './Card';


const ListaPokemons = () => {
    const pokemons = useIndex()['pokemons']
    const dispatch = useIndexDispatch()
    useEffect(() => {
        getAllPokemons().then(res => {
            if (res.status === 200) {
                dispatch({ type: 'get-pokemons', pokemons: res.data.data })
            }
        }).catch(error => {
            toast.warning(error.message)
        })
    }, [dispatch])


    const deletePokemon = (id) => {
        let confirmation = window.confirm('De verdad quiere eliminar este pokemon?')
        if (confirmation) {
            deletePokemonRequest(id).then(res => {
                if (res.status === 204) {
                    dispatch({ type: 'delete-pokemon', id: id })
                    toast.success("Eliminado correctamente")
                }
            }).catch(error => {
                toast.warning(error.message)
            })
        }
    }

    const editPokemon = (id) => {
        getOnePokemon(id).then(res => {
            if (res.status === 200) {
                dispatch({ type: "is-editing", value: true, payload: res.data.data })
                toast.success(res.data.message)
            }
        }).catch(error => {
            toast.warning(error.message)
        })
    }

    return (
        <>
            <ToastContainer />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    pokemons.map(elem => {
                        const abilities = elem['abilities'].map(item => {
                            return item['name']
                        })
                        return (
                            <Card key={elem['id']} elem={elem} photo={process.env.REACT_APP_BACKEND_URL + elem['photo']} abilities={abilities} withButtons={true} deletePokemon={deletePokemon} editPokemon={editPokemon} />
                        )
                    })
                }
            </div >
        </>
    )
}

export default ListaPokemons