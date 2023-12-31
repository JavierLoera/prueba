import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { getCharacters } from '../api/pokeApi/pokeapi'
import { ToastContainer, toast } from 'react-toastify';
import Card from '../components/Card';


export const PokemonApi = () => {
    const [page, setPage] = useState(1)
    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [count, setCount] = useState(0)
    const [limit, setLimit] = useState(30)
    const [busqueda, setBusqueda] = useState('')


    useEffect(() => {
        getCharacters(limit, page).then(res => {
            if (res.status === 200) {
                toast.success(res.data.message)
                setPokemons([...res.data.results])
                setPokemonsFilter([...res.data.results])
                setCount(res.data.count)

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                toast.error(res.data.message)
            }
        }).catch(error => {
            toast.error(error.message)
        })
    }, [page, limit])

    const handleClicksetPage = (e) => {
        const page = Number(e.target.dataset.page)
        setPage(page)
    }

    const handleChangeFilterByName = (e) => {
        setBusqueda(e.target.value)
        filtrar(busqueda)

    }

    const filtrar = (value) => {
        let elementosFiltrados = pokemonsFilter.filter(elem => {
            return elem.name.toString().toLowerCase().includes(value.toLowerCase())
        })
        setPokemons(elementosFiltrados)
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="container mx-auto">
                <div className='flex'>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(e.target.value)
                        }}
                        className="w-1/3 px-4 py-4 border my-5 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                    <input value={busqueda} onChange={handleChangeFilterByName} className='w-1/3 py-4 px-4 border my-5 ml-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' type="text" placeholder='busqueda por nombre'>
                    </input>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        pokemons.map(elem => {
                            const abilities = elem.abilities.map(elem => {
                                return elem['ability']['name']
                            })

                            const photo = elem['photo'] !== null ? elem['photo'] : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                            return (
                                <Card key={elem['name']} elem={elem} photo={photo} abilities={abilities} withButtons={false} ></Card>
                            )
                        })
                    }
                </div >
            </div>
            <div className='flex justify-center'>
                <Pagination limit={limit} totalItems={count} page={page} handleClicksetPage={handleClicksetPage} />
            </div>
        </>
    )
}
