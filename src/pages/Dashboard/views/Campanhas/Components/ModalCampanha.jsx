import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Button } from '@mui/material';
import './ModalCampanha.modules.css';

export default function ModalCampanha({ isOpen, onClose, campanhaAtual, onSaveCampanha }) {
    const [novaCampanha, setNovaCampanha] = useState({
        nomeCampanha: "",
        descricao: "",
        comecaEm: "",
        terminaEm: ""
    });

    // Preenche o formulário com os dados da campanha para edição
    useEffect(() => {
        if (campanhaAtual) {
            setNovaCampanha({
                nomeCampanha: campanhaAtual.nomeCampanha || "",
                descricao: campanhaAtual.descricao || "",
                comecaEm: campanhaAtual.comecaEm || "",
                terminaEm: campanhaAtual.terminaEm || ""
            });
        } else {
            // Reseta o formulário se for para cadastrar uma nova campanha
            setNovaCampanha({
                nomeCampanha: "",
                descricao: "",
                comecaEm: "",
                terminaEm: ""
            });
        }
    }, [campanhaAtual]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveCampanha(novaCampanha);
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modal-box">
                <h2 className="modal-title">{campanhaAtual ? "Editar Campanha" : "Cadastrar Nova Campanha"}</h2>
                <form
                    onSubmit={handleSubmit}
                    className='modal-description'
                >
                    <label htmlFor="nomeCampanha">Nome da campanha</label>
                    <input
                        type="text"
                        id="nomeCampanha"
                        name="nomeCampanha"
                        value={novaCampanha.nomeCampanha}
                        onChange={(e) => setNovaCampanha({ ...novaCampanha, nomeCampanha: e.target.value })}
                        required
                    />

                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={novaCampanha.descricao}
                        onChange={(e) => setNovaCampanha({ ...novaCampanha, descricao: e.target.value })}
                    />

                    <label htmlFor="comecaEm">Data de Início</label>
                    <input
                        type="date"
                        id="comecaEm"
                        name="comecaEm"
                        value={novaCampanha.comecaEm}
                        onChange={(e) => setNovaCampanha({ ...novaCampanha, comecaEm: e.target.value })}
                        required
                    />

                    <label htmlFor="terminaEm">Data de Fim</label>
                    <input
                        type="date"
                        id="terminaEm"
                        name="terminaEm"
                        value={novaCampanha.terminaEm}
                        onChange={(e) => setNovaCampanha({ ...novaCampanha, terminaEm: e.target.value })}
                        required
                    />

                    <div className="modal-buttons">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: 'var(--bg-terciario)' }}
                            className='btn-modal'
                        >
                            {campanhaAtual ? "Salvar Alterações" : "Salvar"}
                        </Button>
                        <Button
                            onClick={onClose}
                            sx={{ mt: 2, ml: 2, backgroundColor: 'var(--bg-terciario)' }}
                            variant="contained"
                            className='btn-modal'
                        >
                            {campanhaAtual ? "Cancelar" : "Fechar"}
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

ModalCampanha.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    campanhaAtual: PropTypes.object,
    onSaveCampanha: PropTypes.func.isRequired
};