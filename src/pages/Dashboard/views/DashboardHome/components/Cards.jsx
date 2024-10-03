export default function Cards() {
    return (
        <>
            <div className="card--container">
                <div className="card--wrapper">
                    
                    <div className="dashboard--card light-red">
                        <div className="card--header">
                            <span className="title">Produtos Cadastrados</span>
                            <i className="fas-icon dark-red" >12</i>
                        </div>
                    </div>

                    <div className="dashboard--card light-purple">
                        <div className="card--header">
                            <span className="title">Produtos Recebidos</span>
                            <i className="fas-icon dark-purple">27</i>
                        </div>
                    </div>

                    <div className="dashboard--card light-green">
                        <div className="card--header">
                            <span className="title">Cestas Distribuídas</span>
                            <i className="fas-icon dark-green">7</i>
                        </div>
                    </div>

                    <div className="dashboard--card light-blue">
                        <div className="card--header">
                            <span className="title">Pessoas Ajudadas</span>
                            <i className="fas-icon dark-blue">35</i>
                        </div>
                    </div>
                </div>
            
            </div>
        </>
    );
}