// Essa é a tela inicial do Dashboard.
// Quando o usuário entra no Dashboard, essa é a primeira tela que ele deve ver.

import Cards from "./components/Cards";
import Table from "./components/Table";

export default function DashboardHome() {
    return (
        <div className="dashboard-content">
            <Cards />
            <Table />
        </div>
    );
}