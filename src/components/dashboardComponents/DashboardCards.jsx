export default function DashboardCards() {
    return (
        <>
            <div className="card--container">
                <h2 className="main--title">Situação atual</h2>
                
                <div className="card--wrapper">
                    
                    <div className="payment--card light-red">
                        <div className="card--header">
                            <div className="amount">
                                <span className="title">Payment amount</span>
                                <span className="amount--value">$500</span>
                            </div>
                            <i className="fas-icon dark-red" ></i>
                        </div>
                            <span className="card--detail">**** **** **** 1234</span>
                    </div>

                    <div className="payment--card light-purple">
                        <div className="card--header">
                            <div className="amount">
                                <span className="title">Payment amount</span>
                                <span className="amount--value">$500</span>
                            </div>
                            <i className="fas-icon dark-purple"></i>
                        </div>
                            <span className="card--detail">**** **** **** 1234</span>
                    </div>

                    <div className="payment--card light-green">
                        <div className="card--header">
                            <div className="amount">
                                <span className="title">Payment amount</span>
                                <span className="amount--value">$500</span>
                            </div>
                            <i className="fas-icon dark-green"></i>
                        </div>
                            <span className="card--detail">**** **** **** 1234</span>
                    </div>

                    <div className="payment--card light-blue">
                        <div className="card--header">
                            <div className="amount">
                                <span className="title">Payment amount</span>
                                <span className="amount--value">$500</span>
                            </div>
                            <i className="fas-icon dark-blue"></i>
                        </div>
                            <span className="card--detail">**** **** **** 1234</span>
                    </div>
                </div>
            
            </div>
        </>
    );
}