import '../../styles/Home.css';

export default function BusqueEntidade() {
    return(
        <main className="BEContainer">
            <form className="BEForm" action="">
                <h2>Busque uma entidade:</h2>
                <input className="BEInput" type="text" name="busqueEntidade" placeholder="Busque uma entidade aqui"/>
                <button className="BEButton">Buscar</button>
            </form>
        </main>
    )
}