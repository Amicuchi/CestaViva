import { useParams } from "react-router-dom";
import ListaProdutos from "./Components/ListaProdutos";

export default function IdCampanha() {
  const { idCampanha } = useParams();

  return (
    <div>
      <ListaProdutos campanhaId={idCampanha} />
    </div>
  );
}
