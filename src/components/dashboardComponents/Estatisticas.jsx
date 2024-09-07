import DashboardTable from "./DashboardTable";

export default function Estatisticas() {
    return (
        <>
            <div className="card--container">
                <h2>Estatísticas</h2>
                <p>Aqui devem aparecer os dados de:
                    - Produros solicitados
                    - Produtos recebidos
                    - Cestas completadas
                    - Cestas distribuídas
                    - Pessoas ajudadas
                </p>
            </div>

            <DashboardTable />
        </>
    )
}