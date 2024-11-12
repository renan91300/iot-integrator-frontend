import React, { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import { fetchMembers, sendInvitation } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalConvidarMembro from "../components/ModalConvidarMembro";
import handleChange from "../components/utils/handleChange";

const Membros = () => {
    const [members, setMembers] = useState([]);
    const [inputs, setInputs] = useState({
        email: '',
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const localProjectId = sessionStorage.getItem("localProjectId")

    function fetch() {
        setLoading(true);
        fetchMembers(localProjectId)
            .then((res) => {
                setMembers(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar os membros do projeto");
            })

    }

    function handleInvite() {
        setShowModal(true);
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: inputs?.email,
            name: inputs?.name,
            project: localProjectId,
        }

        sendInvitation(data)
            .then((res) => {
                toast.success("Convite enviado com sucesso");
                fetch();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao enviar o convite");
            })
            .finally(() => {
                setShowModal(false);
            });
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <ToastContainer />
            <ModalConvidarMembro
                show={showModal}
                inputs={inputs}
                handleSubmit={handleSubmit}
                handleChange={localHandleChange}
                handleClose={() => setShowModal(false)}
            />
            <h1>Membros do projeto</h1>
            <Button onClick={handleInvite}>Convidar Membro</Button>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="striped" className="noWrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Convite Aceito</th>
                    </tr>
                </thead>
                <tbody id="corpo">
                    {members.map((member, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.accepted ? "Sim" : "Não"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Membros