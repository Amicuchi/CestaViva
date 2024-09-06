import DashboardTable from "./DashboardTable";

export default function Estatisticas() {
    return(
        <>
            <h2>Estatísticas</h2>
            <p>Aqui devem aparecer os dados de: 
                - Produros solicitados
                - Produtos recebidos
                - Cestas completadas
                - Cestas distribuídas
                - Pessoas ajudadas
            </p>

            <DashboardTable />
        </>
    )
}