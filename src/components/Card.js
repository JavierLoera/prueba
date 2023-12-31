import React from 'react'
import { Link } from 'react-router-dom'


const Card = ({ elem, photo, abilities, withButtons, deletePokemon, editPokemon }) => {
    return (
        <>
            <div key={elem['name']} className="bg-gray-300 p-4 h-5/6 mx-5 md:mx-0">
                <div className='h-1/2 w-100'>
                    <img loading='lazy' alt={"img-" + elem['name']} className='h-full w-full object-cover object-center' src={photo} />
                </div>
                <div>
                    <h3 className='text-lg my-2 font-bold'>{elem['name']}</h3>
                    <p> <strong>Experiencia base: </strong><span className='float-end'>{elem['base_experience']}</span></p>
                    <p><strong>altura: </strong> <span className='float-end'>{elem['height']}</span></p>
                    <p><strong>peso: </strong>  <span className='float-end'>{elem['weight']}</span></p>
                </div>
                <div>
                    <p>Habilidades:</p>
                    <ul className='px-4'>
                        {
                            abilities.map((item, i) => {
                                return (
                                    <li className='list-disc' key={i}>{item}</li>
                                )
                            }
                            )
                        }
                    </ul>
                </div>

                {
                    withButtons && (
                        <div className='flex flex-row justify-end gap-5'>
                            <i className='h-5 w-5 text-red-600' onClick={() => deletePokemon(elem['id'])}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </i>
                            <i className='h-5 w-5' onClick={() => editPokemon(elem['id'])}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </i>
                            <Link to={`/pdf-pokemon/${elem['id']}`}>
                                <i className='h-5 w-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>

                                </i>
                            </Link>
                        </div>
                    )
                }
            </div></>

    )
}

export default Card