import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import './createUser';
import '../Relatorio.css';
import CreateUserModal from "./createUserModal";
import { fetchUsers, deleteUser } from "../../services/users";
import UserUp from '../../pages/users/UserUp';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";


export default function Users() {
    const [UsersLoading, setLoading] = useState(false);
    const [Users, setUsers] = useState([]);

    function fetch() {
        setLoading(true);
        fetchUsers()
            .then((res) => {
                setUsers(res);
                setLoading(false);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar a lista de usuários");
                setLoading(false);
            });
    }

    function remove(id) {

        deleteUser(id)
            .then((res) => {
                fetch();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao deleter o usuário");
            });
    }

    useEffect(() => {
        document.title = "Relatórios"
        fetch();
        //eslint-disable-next-line
    }, []);


    return (
        <>
            <ToastContainer />
            <h1>Relatório de Usuários</h1>
            <CreateUserModal />
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="dark" className="noWrap">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody id="corpo">
                    <>
                        {
                            Users?.map((user) => (
                                <tr key={user.email}>
                                    <td>{user.name || "Não preenchido"}</td>
                                    <td>{user.email}</td>
                                    <td>{user.is_active ? "Ativo" : "Desativado"}</td>
                                    <td><UserUp userId={user.id} /></td>
                                    <td><Button type="button" className='botao2' onClick={() => { remove(user.id) }}>Excluir</Button></td>
                                </tr>
                            ))
                        }
                    </>
                </tbody>
            </Table>
        </>
    );
}