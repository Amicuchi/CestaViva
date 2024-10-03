import PropTypes from 'prop-types';
import { Modal, Box, Button } from '@mui/material';
import './ModalTermo.css'

export default function ModalTermo({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modal-box">
                <h2 id="modal-title" className="modal-title">
                    Termo de Uso do Cesta Viva
                </h2>
                <div id="modal-description" className="modal-description">
                    <h3>1. Introdução</h3>
                    <p>Bem-vindo ao CestaViva! Este Termo de Uso rege o uso do site, e ao se cadastrar, a entidade aceita os termos aqui descritos. O propósito do site, que é conectar doadores a instituições que montam e distribuem cestas de alimentos. Esse termo de uso rege a utilização do site e o cadastro das entidades.</p>

                    <h3>2. Coleta de Dados</h3>
                    <p>Durante o cadastro, coletamos informações sobre a instituição. Esses dados serão usados para conectar doadores com sua entidade.</p>
                    <p>Segue a lista dos dados coleados:</p>
                    <ul>
                        <li>CNPJ</li>
                        <li>Razão Social</li>
                        <li>Nome da instituição</li>
                        <li>Endereço</li>
                        <li>Responsável</li>
                        <li>Telefone de contato</li>
                        <li>E-mail</li>
                    </ul>

                    <h3>3. Uso dos Dados</h3>
                    <p>Os dados coletados serão usados para facilitar doações e melhorar nosso sistema. A entidade consente com o uso dessas informações para as finalidades descritas.</p>

                    <p>Os dados fornecidos serão utilizados para:</p>
                    <ul>
                        <li>Exibir a entidade no sistema, permitindo que doadores a encontrem.</li>
                        <li>Comunicar sobre possíveis doações e novas oportunidades.</li>
                        <li>Realizar análises estatísticas e melhorias no sistema.</li>
                    </ul>

                    <h3>4. Compartilhamento de Dados</h3>
                    <p>Seus dados não serão compartilhados ou cedidos a terceiros sem seu consentimento, exceto quando necessário para o funcionamento do sistema. (como integração com ferramentas de geolocalização).</p>

                    <h3>5. Segurança</h3>
                    <p>Tomamos medidas de segurança para proteger suas informações, como encriptação da senha antes de enviar para o banco de dados, de maneira que apenas você conheça sua senha, mas não podemos garantir proteção completa contra ataques cibernéticos.</p>

                    <h3>6. Alteração e Exclusão de Dados</h3>
                    <p>Você pode solicitar a alteração ou exclusão de seus dados a qualquer momento, bem como o encerramento da conta.</p>

                    <h3>7. Responsabilidades da Entidade</h3>
                    <p>A entidade concorda em fornecer informações corretas e utilizar o sistema de forma legítima. Utilizar o site de acordo com os propósitos estabelecidos, não se envolvendo em atividades fraudulentas.</p>

                    <h3>8. Modificações nos Termos</h3>
                    <p>Este termo poderá ser alterado a qualquer momento. Caso seja, as mudanças serão comunicadas pelo site.</p>

                    <h3>9. Contato</h3>
                    <p>Em caso de dúvidas, entre em contato pelo [e-mail/telefone] para assistência.</p>
                    <hr />
                </div>
                
                <Button 
                    onClick={handleClose} 
                    sx={{ backgroundColor: 'var(--bg-terciario)' }} 
                    className="ButtonTotal" 
                    variant="contained">
                    Fechar
                </Button>
            </Box>
        </Modal>
    );
}

// Adicionando a validação de prop-types
ModalTermo.propTypes = {
    open: PropTypes.bool.isRequired,         // open deve ser um booleano e é obrigatório
    handleClose: PropTypes.func.isRequired,  // handleClose deve ser uma função e é obrigatório
};