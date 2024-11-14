import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { fetchDevices, updateDevice, deleteDevice } from "../services/users";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./DeviceTable.css"; // Arquivo de estilo para o interruptor
import ModalConfirm from "../components/ModalConfirm";

const Dispositivos = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const navigate = useNavigate();
    const localProjectId = sessionStorage.getItem("localProjectId");

    // Função para buscar dispositivos
    const fetch = () => {
        setLoading(true);
        fetchDevices(localProjectId)
            .then((res) => {
                setDispositivos(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao buscar os dispositivos");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleStatusChange = (id, newValue) => {
        const newDevice = dispositivos.find((device) => device.id === id);
        newDevice.status.field_value = newValue;

        setDispositivos((prevState) =>
            prevState.map((device) => (device.id === id ? newDevice : device))
        );
    };

    // Função para atualizar o status do dispositivo
    const handleUpdateStatus = (id, newStatus) => {
        const dispositivo = dispositivos.find((device) => device.id === id);
        const newDevice = { ...dispositivo, status: { ...dispositivo.status, field_value: newStatus } };
        updateDevice(newDevice)
            .then(() => {
                toast.success("Status atualizado com sucesso");
                setDispositivos((prevState) =>
                    prevState.map((device) => (device.id === id ? newDevice : device))
                );
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao atualizar o status do dispositivo");
            });
    };

    const handleDeleteDevice = (id) => {
        setSelectedDevice(id);
        setShowModal(true);
    }

    const localDeleteDevice = (id) => {
        deleteDevice(id, localProjectId)
            .then(() => {
                toast.success("Dispositivo excluído com sucesso");
                fetch();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Algo deu errado ao excluir o dispositivo");
            });
    }

    return (
        <>
            <ToastContainer />
            <ModalConfirm
                show={showModal}
                question="Tem certeza que deseja excluir o dispositivo?"
                confirmAction={() => {
                    localDeleteDevice(selectedDevice);
                    setShowModal(false);
                }}
                cancelAction={() => setShowModal(false)}
                handleClose={() => setShowModal(false)}
            />
            <h1>Relatório de Dispositivos</h1>
            <Button variant="btn btn-primary" onClick={() => navigate("/cadastrar_dispositivo")}>
                Adicionar Dispositivo
            </Button>
            <hr style={{ width: "45vw" }}></hr>
            <Table responsive variant="striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Localização</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Dashboard</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositivos.map((dispositivo) => (
                        <tr key={dispositivo.id}>
                            <td>{dispositivo.name}</td>
                            <td>{dispositivo.location.name}</td>
                            <td>{dispositivo.category.name}</td>
                            <td>
                                {dispositivo.status?.field_type === "switch" ? (
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={dispositivo.status.field_value === "1"}
                                            onChange={() =>
                                                handleStatusChange(
                                                    dispositivo.id,
                                                    dispositivo.status.field_value === "1" ? "0" : "1"
                                                )
                                            }
                                            onClick={() =>
                                                handleUpdateStatus(
                                                    dispositivo.id,
                                                    dispositivo.status.field_value === "1" ? "0" : "1"
                                                )
                                            }
                                        />
                                        <span className="slider"></span>
                                    </label>
                                ) : dispositivo.status?.field_type === "slider" ? (
                                    <input
                                        type="range"
                                        min={dispositivo.status.field_possible_values[0]}
                                        max={dispositivo.status.field_possible_values[1]}
                                        value={dispositivo.status.field_value}
                                        onChange={(e) =>
                                            handleStatusChange(dispositivo.id, e.target.value)
                                        }
                                        onMouseUp={() =>
                                            handleUpdateStatus(dispositivo.id, dispositivo.status.field_value)
                                        }
                                        onTouchEnd={() =>
                                            handleUpdateStatus(dispositivo.id, dispositivo.status.field_value)
                                        }
                                    />
                                ) : (
                                    "Status Indisponível"
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="btn btn-success"
                                    onClick={() => navigate(`/dispositivos/${dispositivo.id}/dashboard`)}
                                >
                                    Dashboard
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="btn btn-primary"
                                    onClick={() => navigate(`/dispositivos/${dispositivo.id}`)}
                                >
                                    Editar
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="btn btn-danger"
                                    onClick={() => handleDeleteDevice(dispositivo.id)}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Dispositivos;
