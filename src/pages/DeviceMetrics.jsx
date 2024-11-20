import { useEffect, useState, useRef, useCallback } from "react";
import { fetchDeviceById, fetchDeviceData } from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

const DeviceMetrics = () => {
    const [device, setDevice] = useState({});
    const [loading, setLoading] = useState(true);
    const [deviceMetrics, setDeviceMetrics] = useState([]);

    const navigate = useNavigate();
    const deviceId = useParams().id;
    const localProjectId = sessionStorage.getItem("localProjectId");

    const intervalRef = useRef(null);

    // Função para carregar dados do dispositivo e atualizar as métricas
    const loadDeviceData = useCallback(() => {
        // Verificar se `received_data_config` está presente
        if (!device.received_data_config) return;

        fetchDeviceData(deviceId, localProjectId)
            .then((response) => {
                setDeviceMetrics((prevState) =>
                    prevState.map((metric, index) => {
                        const config = device.received_data_config[index];
                        if (!config) return metric; // Verifica se `config` está definido

                        const series = [];
                        const options = {
                            chart: { id: "basic-bar" },
                            xaxis: { categories: [] },
                        };

                        response[config.name]?.forEach((item) => {
                            if (item.data[config.name] === undefined) return;
                            options.xaxis.categories.unshift(item.created_at);
                            series.unshift(item.data[config.name]);
                        });

                        return { series, options };
                    })
                );
            })
            .catch((error) => console.log(error));
    }, [device, deviceId, localProjectId]);

    // useEffect para carregar o dispositivo
    useEffect(() => {
        if (!deviceId) {
            navigate("/dispositivos");
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                // Carregar dados do dispositivo
                const deviceResponse = await fetchDeviceById(deviceId, localProjectId);
                setDevice(deviceResponse);

                // Inicializar deviceMetrics com estrutura básica para cada métrica
                const initialMetrics = deviceResponse.received_data_config?.map(() => ({
                    series: [],
                    options: {}
                }));
                setDeviceMetrics(initialMetrics);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [deviceId, localProjectId, navigate]);

    // useEffect para iniciar `loadDeviceData` após `device` ser definido e configurar o intervalo
    useEffect(() => {
        if (!device.received_data_config) return;

        // Carregar dados iniciais das métricas
        loadDeviceData();

        // Configurar intervalo para atualizar as métricas periodicamente
        intervalRef.current = setInterval(loadDeviceData, 5000);

        // Limpar o intervalo ao desmontar o componente
        return () => clearInterval(intervalRef.current);
    }, [device, loadDeviceData]);

    return (
        <div>
            <h1>Métricas do Dispositivo</h1>
            <hr style={{ width: "45vw" }}></hr>
            <div className="row" style={{display: "flex"}}>
                {device.received_data_config?.map((config, index) => (
                    <div className="col-6" key={index}>
                        <Chart
                            options={{
                                ...deviceMetrics[index]?.options,
                                title: {
                                    text: config.name,
                                    align: 'center'
                                },
                                xaxis: {
                                    ...deviceMetrics[index]?.options?.xaxis,
                                    labels: {
                                        formatter: (value) => {
                                            const time = new Date(value);
                                            return time.toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            });
                                        }
                                    }
                                }
                            }}
                            series={[{ data: deviceMetrics[index]?.series }]}
                            type={config.chart_type}
                            width="500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceMetrics;
