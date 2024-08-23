import '../../styles/Home.css';

export default function BusqueEntidade() {
    return(
        <div className="BEContainer">
            <h2 className='TitleH2'>Busque uma entidade:</h2>
            <form className="BEForm" action="">
                <input className="BEInput" type="text" name="busqueEntidade" placeholder="Busque uma entidade aqui"/>
                <button>Buscar</button>
            </form>
        </div>
    )
}