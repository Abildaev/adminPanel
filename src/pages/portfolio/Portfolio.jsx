import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/portfolio')
            .then(response => response.json())
            .then(data => this.setState({portfolio: data}))
    }

    render() {
        return (

            <div className="container pt-5 pb-5">
                <div className="container-fluid">
                    <h1 className="h3 mb-4 text-gray-800">Потфолио</h1>
                    <Link to="/portfolio/addWork" className="btn btn-primary mb-4 ms-auto d-block w-25">Добавить
                        работу</Link>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Редактирование работ</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Название работы</th>
                                        <th>Категория</th>
                                        <th>Дата создания</th>
                                        <th>Редактировать</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.portfolio.map((el, key) => {

                                        let test = '';

                                        if(el.category == 1) {
                                            test = 'Мобильные игры'
                                        }else if(el.category == 2) {
                                            test = 'Игры для ПК'
                                        }else if(el.category == 3) {
                                            test = '2d Анимация'
                                        }

                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{el.name}</td>
                                                <td>{test}</td>
                                                <td>{el.date}</td>
                                                <td>
                                                    <Link className="btn btn-link" to={`/portfolioDetail/${el.id}`}>
                                                        подробнее...
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Portfolio;