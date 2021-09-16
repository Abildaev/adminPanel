import React from "react";
import {Button, Form, Modal} from "react-bootstrap";


class ServiceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            service: {
                serviceName: '',
                serviceDescrip: '',
                serviceImg: ''
            },
            constName: '',
            modal: false,
            delete: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    getDataProject() {
        fetch(`http://localhost:3002/services/${this.props.match.params.id}`)

            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("ошибка")
                }
            })
            .then(data => this.setState({
                    service: {
                        serviceName: data.serviceName,
                        serviceDescrip: data.serviceDescrip,
                        serviceImg: data.serviceImg
                    },
                    constName: data.serviceName
                }
            ))
    }

    componentDidMount() {
        this.getDataProject()
    }

    handleChange(event) {
        this.setState({
            service: {
                [event.target.name]: event.target.value
            }
        })
    }

    deleteData() {
        let option = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:3002/services/${this.props.match.params.id}`, option)
            .then(response => {
                if(response.ok) {
                    alert('успешно удалено');
                    window.location = 'http://localhost:3000/services';
                }
            });
    }
    editData(){
        let data = {...this.state.service};
        let option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:3002/services/${this.props.match.params.id}`, option)
            .then(response => {
                if(response.ok) {
                    this.handleClose();
                    alert(`успешно изменено`);
                    this.getDataProject();
                }
                else {
                    alert(`ошибка ${response.status}`)
                }
            });
    }


    handleClose() {
        if(this.state.modal == true && this.state.delete == false) {
            this.setState({
                modal: false
            })
        }else if(this.state.modal == false && this.state.delete == true){
            this.setState({
                delete: false
            })
        }
    }

    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="mb-3">{this.state.constName}</h1>
                <Form>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="serviceName">
                                <Form.Label>Название услуги</Form.Label>
                                <Form.Control type="text" value={this.state.service.serviceName} name='serviceName'
                                              onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group controlId="serviceImg">
                                <Form.Label>Путь иконки</Form.Label>
                                <Form.Control type="text" value={this.state.service.serviceImg} name='serviceImg'
                                              onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className=" mb-3">
                            <Form.Group controlId="serviceDescrip">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control as="textarea" rows={5} style={{resize: 'none'}}
                                              value={this.state.service.serviceDescrip} name='serviceDescrip'
                                              onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="primary" onClick={() => {
                        this.setState({modal: true})
                    }}>
                        Редактировать
                    </Button>
                    <Button variant="secondary" className="ms-3" onClick={() => this.setState({delete: true})}>
                        Удалить
                    </Button>
                </Form>
                <Modal show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.constName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно хотите сохранить изменения</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            нет
                        </Button>
                        <Button variant="primary" onClick={this.editData}>
                            Да
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.delete} onHide={this.handleClose}>
                    <Modal.Body>Вы действительно хотите удалить запись?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            нет
                        </Button>
                        <Button variant="primary" onClick={this.deleteData}>
                            Да
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ServiceForm;