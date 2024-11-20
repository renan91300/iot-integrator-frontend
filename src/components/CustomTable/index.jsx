import "./style.css";

const CustomTable = ({ data }) => {
    if (!data.length) {
        return <div>Carregando...</div>;
    }

    // Extrair cabeçalhos das chaves do primeiro objeto
    const headers = Object.keys(data[0]);

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "even-row" : "odd-row"}>
                            {headers.map((header) => (
                                <td key={header}>{row[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
