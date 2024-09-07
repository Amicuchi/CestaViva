import '../../styles/Home.css';

export default function BusqueEntidade() {
    return(
        <main className="BEContainer">
            <h1>Bem-vindo ao CestaViva</h1>
            <p>Facilitando a doação de alimentos para quem mais precisa.</p>
            <form action="">
                <h2>Busque uma entidade:</h2>
                <input className="BEInput" type="text" name="busqueEntidade" placeholder="Busque uma entidade aqui"/>
                <button className="BEButton">Buscar</button>
            </form>
        </main>
    )
}