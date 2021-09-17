import React from "react";
import {Button, Form} from "react-bootstrap";


class AddServices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serviceName: '',
            serviceDescrip:'',
            serviceImg: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.addData = this.addData.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addData() {
        let data = {...this.state}

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:3002/services`, options)
            .then(response => {
                if(response.ok) {
                    alert('успешно добавлено!');
                    window.location = 'http://localhost:3000/services';
                }
            })

    }


    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="mb-3">Добавить работу в портфолио</h1>
                <Form>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="serviceName">
                                <Form.Label>Название услуги</Form.Label>
                                <Form.Control type="text" name='serviceName' value={this.state.serviceName} onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="serviceImg">
                                <Form.Label>Путь иконки</Form.Label>
                                <Form.Control type="text"  name='serviceImg' value={this.state.serviceImg}
                                              onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className=" mb-3">
                            <Form.Group controlId="serviceDescrip">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control as="textarea" rows={5} style={{resize: 'none'}}
                                              name='serviceDescrip'
                                              value={this.state.description}
                                              onChange={this.handleChange}/>
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

export default AddServices;