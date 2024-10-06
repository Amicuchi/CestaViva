import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function FormCampanha({ campanha, onSaveCampanha }) {
    const [novaCampanha, setNovaCampanha] = useState({
        nomeCampanha: "",
        descricao: "",
        dataInicio: "",
        dataFim: ""
    });

    useEffect(() => {
        if (campanha) {
            setNovaCampanha(campanha);
        }
    }, [campanha]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveCampanha(novaCampanha);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome da campanha"
                value={novaCampanha.nomeCampanha}
                onChange={(e) => setNovaCampanha({ ...novaCampanha, nomeCampanha: e.target.value })}
            />
            <input
                type="text"
                placeholder="Descrição"
                value={novaCampanha.descricao}
                onChange={(e) => setNovaCampanha({ ...novaCampanha, descricao: e.target.value })}
            />
            <input
                type="date"
                value={novaCampanha.dataInicio}
                onChange={(e) => setNovaCampanha({ ...novaCampanha, dataInicio: e.target.value })}
            />
            <input
                type="date"
                value={novaCampanha.dataFim}
                onChange={(e) => setNovaCampanha({ ...novaCampanha, dataFim: e.target.value })}
            />
            <button type="submit">Salvar</button>
        </form>
    );
}

FormCampanha.propTypes = {
    campanha: PropTypes.object,
    onSaveCampanha: PropTypes.func.isRequired,
};
