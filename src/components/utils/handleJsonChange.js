
function handleJsonChange(event, inputs, setInputs, setError){
    const value = event.target.value;
    const name = event.target.name;

    setInputs({...inputs, [name]: value});
    try {
        JSON.parse(value);  // Verifica se o JSON é válido
        setError(null);
    } catch (err) {
        setError('JSON inválido. Verifique a sintaxe.');
    }
};

export default handleJsonChange;
