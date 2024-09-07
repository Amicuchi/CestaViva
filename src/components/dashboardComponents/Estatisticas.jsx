import DashboardTable from "./DashboardTable";

export default function Estatisticas() {
    return (
        <>
            <div className="card--container">
                <h2>Estatísticas</h2>
                <p>Aqui devem aparecer os dados de:</p>
                    <ul>
                        <li>Produros solicitados</li>
                        <li>Produtos recebidos</li>
                        <li>Cestas completadas</li>
                        <li>Cestas distribuídas</li>
                        <li>Pessoas ajudadas</li>
                    </ul>
            </div>

            <DashboardTable />
        </>
    )
}