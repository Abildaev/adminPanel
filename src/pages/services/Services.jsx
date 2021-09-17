import React from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";




class Services extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            services: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/services')
            .then(response => response.json())
            .then(data => this.setState({services: data}))
    }


    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="h3 mb-4 text-gray-800">Услуги</h1>

                <Link to="/services/addService" className="btn btn-primary mb-4 ms-auto d-block w-25">Добавить
                    услугу</Link>

                <div className="row">

                    {this.state.services.map((el,key) => (
                        <div className="col-4 mb-4">
                            <Card key={key}>
                                <Card.Body>
                                    <Card.Title>{el.serviceName}</Card.Title>
                                    <Card.Text>
                                        {el.serviceDescrip.substr(0,100)}...
                                    </Card.Text>
                                    <Link to={`/service/${el.id}`} variant="btn btn-primary">открыть</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

                </div>


            </div>
        );
    }
}

export default Services;