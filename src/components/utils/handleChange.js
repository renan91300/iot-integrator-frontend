function handleChange(event, inputs, setInputs) {
    if (event.target.type === "checkbox") {
        const value = event.target.checked === true;
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value });
    } else {
        //rawValue é o valor sem máscara e value é o valor com máscara
        const value = event.target.rawValue ? event.target.rawValue : event.target.value;
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value });
    }
}

export default handleChange;