const DinamicInput = ({ formik, name, type, element, placeholder }) => {
    const Element = element || 'input';

    const handleChange = type === "file" ? ((event) => {
        formik.setTouched({
            [name]: true,
        });
        if (event.target.files[0]) {
            formik.setFieldValue(name, event.target.files[0]);
            formik.setFieldValue("preview", URL.createObjectURL(event.target.files[0]));
        }
    }) : formik.handleChange(name)

    return (
        <>
            <Element
                onChange={handleChange}
                onBlur={formik.handleBlur(name)}
                className="w-full border border-solid border-blueGray-200 pr-6 pl-4 py-4 font-bold placeholder-gray-400 rounded-r-lg rounded-l-lg focus:outline-none"
                type={type}
                placeholder={placeholder}
                value={type !== "file" ? formik.values[name] : ""}
            />
            <div className="text-red-400 mb-2">
                {formik.touched[name] && formik.errors[name]}
            </div>
        </>
    );
};


export default DinamicInput