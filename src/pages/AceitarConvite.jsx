import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { acceptInvitation } from "../services/users";

const AceitarConvite = () => {
    const { token } = useParams(); // Pega o token da URL
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error("Token inválido.");
            return;
        }

        // Função para aceitar o convite
        // Se der erro e o status for 302, redirecionar para cadastro
        // Se o status for 200, redirecionar para login

        acceptInvitation(token)
            .then(() => {
                toast.success("Convite aceito com sucesso!", {delay: 1});
                navigate("/login");
            })
            .catch((err) => {
                if (err.response.status === 302) {
                    toast.success("Para aceitar o convite, por favor, realize seu cadastro.", {delay: 1});
                    navigate("/cadastro");
                } else {
                    toast.error("Erro ao aceitar convite.");
                }
            })
            .finally(() => setLoading(false));
    }, [token, navigate]);

    return (
        <>
            <ToastContainer />
            {loading ? <p>Carregando...</p> : null}
        </>
    );
};

export default AceitarConvite;
