import React from "react";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";


class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sliders: []
        }
    }


    componentDidMount() {
        fetch('http://localhost:3002/sliders')
            .then(response => response.json())
            .then(data => this.setState({sliders: data}))
    }

    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="mb-3">Добавить текст в слайдер</h1>
                <Link to="/sliders/addSliders" className="btn btn-primary mb-4 ms-auto d-block w-25">Добавить
                    слайдер</Link>

                <div className="row">

                    {this.state.sliders.map((el, key) => (
                        <div className="col-6" key={key}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{el.title}</Card.Title>
                                    <Card.Text>
                                        {el.paraph}
                                    </Card.Text>
                                    <Link to={`/service/1`} variant="btn btn-primary">открыть</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Slider;