import React from "react";
import {Button, Form} from "react-bootstrap";


class AddWork extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            img: '',
            date: '',
            description: '',
            categoryPort: []

        }

        this.handleChange = this.handleChange.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3002/categoryPortfolio')
            .then(response => response.json())
            .then(data => this.setState({
                categoryPort: data
            }));


    }

    handleChange(event) {
        this.setState({

            [event.target.name]: event.target.value
        })
    }

    addData() {
        let data = {...this.state}

        delete data.categoryPort;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:3002/portfolio`, options)
            .then(response => {
                    if (response.ok) {
                        alert('успешно добавлено!');
                        window.location = 'http://localhost:3000/portfolio';
                    }
                }
            )
        ;
    }


    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="mb-3">Добавить работу в портфолио</h1>
                <Form>
                    <div className="row">

                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="name">
                                <Form.Label>Название проекта</Form.Label>
                                <Form.Control type="text" name='name' onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="category">
                                <Form.Label>Категория</Form.Label>
                                <Form.Select aria-label="Default select example" name="category"
                                             onChange={this.handleChange}>

                                    {this.state.categoryPort.map((el, key) => (

                                        <option value={el.id} key={key}>{el.name}</option>
                                    ))}

                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Путь картинки</Form.Label>
                                <Form.Control type="url" name='img' onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Дата публикации</Form.Label>
                                <Form.Control type="datetime-local" name="date" onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control as="textarea" rows={5} style={{resize: 'none'}}
                                              name="description"
                                              onChange={this.handleChange}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="primary" onClick={this.addData}>
                        Добавить
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AddWork;