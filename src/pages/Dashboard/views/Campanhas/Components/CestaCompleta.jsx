import { useState } from 'react';
import PropTypes from 'prop-types';
import CadastraProduto from './CadastraProduto';
import ListaProdutos from './ListaProdutos';

export default function CestaCompleta ({ campanhaId }) {
    const [produtosAtualizados, setProdutosAtualizados] = useState(false);

    const handleUpdateProdutos = () => {
        setProdutosAtualizados(!produtosAtualizados);
    };

    return (
        <div className="cestas--cestaCompleta">
            <CadastraProduto campanhaId={campanhaId} onUpdateProdutos={handleUpdateProdutos} />
            <ListaProdutos campanhaId={campanhaId} key={produtosAtualizados ? 'updated' : 'not-updated'} />
        </div>
    );
};


// Definindo PropTypes para garantir a validação das props
CestaCompleta.propTypes = {
    campanhaId: PropTypes.func.isRequired,
};