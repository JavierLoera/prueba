import { useIndex, useIndexDispatch } from "../contexts/IndexContext";


export default function Modal({ children, editing }) {
    const dispatch = useIndexDispatch();
    const index = useIndex()
    return (
        <>
            {
                editing && (<button
                    className="bg-blue-200 text-black active:bg-blue-500 
                font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                        dispatch({ type: "abrir-modal" })
                    }}
                >
                    Agregar
                </button>)
            }

            {(editing ? index.isEditing : index.isOpen) ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-100 md:w-4/12 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">{editing ? "Editar" : "Agregar uno nuevo"}</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => dispatch({ type: "cerrar-modal" })}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                            x
                                        </span>
                                    </button>
                                </div>

                                <div className="relative p-6 flex-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }
        </>
    );
};


