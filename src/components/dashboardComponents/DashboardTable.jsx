import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPen, 
    faTrashCan
} from '@fortawesome/free-solid-svg-icons';

export default function DashboardTable() {
    return(
        <div className="tabular--wrapper">
                <h2 className="main--title">Relatório</h2>
                <div className="table--container">
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Transação</th>
                                <th>Descrição</th>
                                <th>Qtd</th>
                                <th>Categoria</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>02/09/2024</td>
                                <td>Doação</td>
                                <td>Arroz 5kg</td>
                                <td>5</td>
                                <td>Básico</td>
                                <td>Efetivado</td>
                                <td className='iconEditTrash'>
                                    <FontAwesomeIcon icon={faPen} /> 
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                            <tr>
                                <td>02/09/2024</td>
                                <td>Doação</td>
                                <td>Arroz 5kg</td>
                                <td>5</td>
                                <td>Básico</td>
                                <td>Efetivado</td>
                                <td className='iconEditTrash'>
                                    <FontAwesomeIcon icon={faPen} /> 
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                            <tr>
                                <td>02/09/2024</td>
                                <td>Doação</td>
                                <td>Arroz 5kg</td>
                                <td>5</td>
                                <td>Básico</td>
                                <td>Efetivado</td>
                                <td className='iconEditTrash'>
                                    <FontAwesomeIcon icon={faPen} /> 
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                            <tr>
                                <td>02/09/2024</td>
                                <td>Doação</td>
                                <td>Arroz 5kg</td>
                                <td>5</td>
                                <td>Básico</td>
                                <td>Efetivado</td>
                                <td className='iconEditTrash'>
                                    <FontAwesomeIcon icon={faPen} /> 
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                            <tr>
                                <td>02/09/2024</td>
                                <td>Doação</td>
                                <td>Arroz 5kg</td>
                                <td>5</td>
                                <td>Básico</td>
                                <td>Efetivado</td>
                                <td className='iconEditTrash'>
                                    <FontAwesomeIcon icon={faPen} /> 
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    )
}