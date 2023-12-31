import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import DinamicInput from "./Input";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { getAbilities } from "../api/abilities/abilities"
import { createPokemon, updatePokemon } from "../api/pokemon/pokemon";
import { ToastContainer, toast } from 'react-toastify';
import { useIndex, useIndexDispatch } from "../contexts/IndexContext";

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
const formSchema = Yup.object({
    abilities: Yup.array().min(1, "Selecciona por lo menos una habilidad").required(),
    base_experience: Yup.number().required('La experiencia es requerida'),
    height: Yup.number().required('la altura es requerida'),
    name: Yup.string().required('El nombre es requerido'),
    weight: Yup.number().required('El peso es requerido'),
    photo: Yup.mixed().nullable().required("La imagen del post es requerida")
        .test(
            "size",
            "El tamaño del archivo es muy grande",
            (value) => value && value.size <= 1024 * 1024)
        .test(
            "type",
            "solo formatos [png,jpg,jpeg,gif]",
            (value) =>
                !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
});

const Form = ({ formEdit }) => {
    const animatedComponents = makeAnimated();
    const [abilities, setAbilities] = useState();
    const dispatch = useIndexDispatch();
    const pokemonEditing = useIndex()['pokemonEditing']

    const initialValues = {
        abilities: [],
        base_experience: formEdit ? pokemonEditing['base_experience'] : '',
        height: formEdit ? pokemonEditing['height'] : '',
        name: formEdit ? pokemonEditing['name'] : '',
        weight: formEdit ? pokemonEditing['weight'] : '',
        photo: "",
        preview: formEdit ? process.env.REACT_APP_BACKEND_URL + pokemonEditing['photo'] : ''
    }


    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            for (let i = 0; i < values.abilities.length; i++) {
                formData.append('abilities', values.abilities[i].id)
            }
            formData.append("base_experience", values.base_experience)
            formData.append("height", values.height);
            formData.append("name", values.name);
            formData.append("weight", values.weight);
            formData.append("photo", values.photo);

            if (formEdit) {
                updatePokemon(pokemonEditing['id'], formData).then(res => {
                    if (res.status === 200) {
                        resetForm();
                        toast.success(res.data.message)
                        dispatch({ type: 'update-pokemon', payload: res.data.data })
                        dispatch({
                            type: 'cerrar-modal'
                        })
                    } else {
                        toast.error(res.data.message)
                    }
                }).catch(error => {
                    toast.error(error.message)
                })
            } else {
                createPokemon(formData).then(res => {
                    if (res.status === 201) {
                        resetForm();
                        toast.success(res.data.message)
                        dispatch({ type: 'create-pokemon', payload: res.data.data })
                        dispatch({
                            type: 'cerrar-modal'
                        })
                    } else {
                        toast.error(res.data.message)
                    }
                }).catch(error => {
                    toast.error(error.message)
                })
            }
        },
        validationSchema: formSchema,
    });


    useEffect(() => {
        getAbilities().then(res => {
            setAbilities(res.data.map(ability => {
                return (
                    {
                        id: ability._id,
                        value: ability.name,
                        label: ability.name,
                        isFixed: true
                    }
                )
            }))
        })
    }, [])


    return (<>
        <ToastContainer></ToastContainer>
        <form onSubmit={formik.handleSubmit}>
            <div className="relative flex-auto overflow-y-auto">
                <div className="w-100">
                    <div className='w-100 h-auto p-2 m-3'>
                        <DinamicInput formik={formik} name="name" type="text" element="input" placeholder="Nombre" />
                        <DinamicInput formik={formik} name="base_experience" type="number" element="input" placeholder="Experiencia base" />
                        <DinamicInput formik={formik} name="height" type="number" element="input" placeholder="Altura" />
                        <DinamicInput formik={formik} name="weight" type="number" element="input" placeholder="Peso" />
                        <Select
                            value={formik.values.abilities}
                            onChange={(Ability) =>
                                formik.setFieldValue('abilities', Ability)
                            }
                            onBlur={formik.handleBlur("abilities")}
                            className="w-full mb-2 font-bold placeholder-gray-400 rounded-r-lg rounded-l-lg focus:outline-none"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={abilities}
                        />
                        <div className="text-red-400 mb-2">
                            {formik.touched.abilities && formik.errors.abilities}
                        </div>

                        {formik.values.preview !== undefined ?
                            <div className="flex justify-center">
                                <img className="w-100 h-40 object-cover" src={formik.values.preview} alt="UploadImage" />
                            </div> : null}

                        <DinamicInput formik={formik} name="photo" type="file" element="input" placeholder="Imagen" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch({ type: "cerrar-modal" })}
                >
                    Cerrar
                </button>
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                >
                    Guardar
                </button>
            </div>
        </form>
    </>

    )
}

export default Form