import { useEffect, useState, useRef, useCallback } from "react";
import { fetchDeviceById, fetchDeviceData } from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import Chart from "react-apexcharts";

// Componentes Auxiliares
const cardStyle = {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const NumberCard = ({ name, value }) => (
    <div style={cardStyle}>
        <h3 style={{ color: '#555' }}>{name}</h3>
        <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#2b90d9' }}>
            {value || 'Carregando...'}
        </p>
        <span style={{ color: '#777' }}>Última Medição</span>
    </div>
);

const BaseChart = ({ type, options, series }) => (
    <Chart options={options} series={series} type={type} width="100%" />
);

const defaultChartOptions = {
    chart: {
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
    },
    xaxis: {
        labels: {
            style: { fontSize: '12px', colors: '#333' },
        },
    },
    yaxis: {
        labels: {
            style: { fontSize: '12px', colors: '#333' },
        },
    },
    title: {
        align: 'center',
        style: { fontSize: '16px', color: '#333' },
    },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
    legend: { position: 'bottom' },
};

const DeviceMetrics = () => {
    const [device, setDevice] = useState({});
    const [loading, setLoading] = useState(true);
    const [deviceMetrics, setDeviceMetrics] = useState([]);
    const navigate = useNavigate();
    const deviceId = useParams().id;
    const localProjectId = sessionStorage.getItem("localProjectId");
    const intervalRef = useRef(null);

    const loadDeviceData = useCallback(() => {
        if (!device.received_data_config) return;

        fetchDeviceData(deviceId, localProjectId)
            .then((response) => {
                setDeviceMetrics((prevState) =>
                    prevState.map((metric, index) => {
                        const config = device.received_data_config[index];
                        if (!config) return metric;

                        const series = { data: [] };
                        const options = {
                            ...defaultChartOptions,
                            title: { text: config.name },
                            xaxis: {
                                ...defaultChartOptions.xaxis,
                                categories: [],
                                labels: {
                                    formatter: (value) => {
                                        const time = new Date(value);
                                        return time.toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        });
                                    },
                                },
                            },
                        };

                        response[config.name]?.forEach((item) => {
                            if (item.data[config.name] === undefined) return;
                            options.xaxis.categories.unshift(item.created_at);
                            series.data.unshift(item.data[config.name]);
                        });

                        return { series, options, tableData: response[config.name] || [] };
                    })
                );
            })
            .catch(console.log);
    }, [device, deviceId, localProjectId]);

    useEffect(() => {
        if (!deviceId) {
            navigate("/dispositivos");
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                const deviceResponse = await fetchDeviceById(deviceId, localProjectId);
                setDevice(deviceResponse);

                const initialMetrics = deviceResponse.received_data_config?.map(() => ({
                    series: { data: [] },
                    options: {},
                    tableData: []
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

    useEffect(() => {
        if (!device.received_data_config) return;

        loadDeviceData();
        intervalRef.current = setInterval(loadDeviceData, 5000);

        return () => clearInterval(intervalRef.current);
    }, [device, loadDeviceData]);

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Métricas do Dispositivo</h1>
            <hr style={{ width: "60%", margin: "auto", marginBottom: "40px" }} />
            <div className="row justify-content-center">
                {device.received_data_config?.map((config, index) => (
                    <div className="col-lg-6 col-md-6" key={index}>
                        {config.chart_type === "number" ? (
                            <NumberCard
                                name={config.name}
                                value={deviceMetrics[index]?.series.data.slice(-1)}
                            />
                        ) : config.chart_type === "table" ? (
                            <CustomTable
                                data={deviceMetrics[index]?.tableData.map((item) => ({
                                    ...item.data                                    
                                }))}
                            />
                        ) : (
                            <BaseChart
                                type={config.chart_type}
                                options={deviceMetrics[index]?.options}
                                series={[deviceMetrics[index]?.series]}
                            />
                        )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceMetrics;
