import React from "react";
import {Button, Form, Modal} from "react-bootstrap";



class FormPortfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                name: '',
                category: '',
                img: '',
                date: '',
                description: '',

            },
            data: {
                name: ''
            },
            modal: false,
            delete: false,
            category: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    getDataProject() {
        fetch(`http://localhost:3002/portfolio/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({
                project: {
                    name: data.name,
                    category: data.category,
                    img: data.img,
                    date: data.date,
                    description: data.description
                },
                data: {
                    name: data.name
                }

            }))

        fetch('http://localhost:3002/categoryPortfolio')
            .then(response => response.json())
            .then(data => this.setState({
                category: data
            }));
    }

    componentDidMount() {
        this.getDataProject();
    }

    handleChange(event){
        this.setState({
            project: {
                [event.target.name]: event.target.value
            }
        })
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

    editData(){
        let data = {...this.state.project};
        let option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:3002/portfolio/${this.props.match.params.id}`, option)
            .then(response => {
                if(response.ok) {
                    this.handleClose()
                    alert(`?????????????? ????????????????`)
                    this.getDataProject();

                }
                else {
                    alert(`???????????? ${response.status}`)
                }
            });
    }


    deleteData() {
        let option = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:3002/portfolio/${this.props.match.params.id}`, option)
            .then(response => {
                if(response.ok) {
                    alert('?????????????? ??????????????');
                    window.location = 'http://localhost:3000/portfolio';
                }
            });
    }



    render() {
        return (
            <div className="container pt-5 pb-5">
                <h1 className="mb-3">{this.state.data.name}</h1>
                <Form>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <Form.Group  controlId="name">
                                <Form.Label>???????????????? ??????????????</Form.Label>
                                <Form.Control type="text" value={this.state.project.name} name='name' onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group  controlId="category">
                                <Form.Label>??????????????????</Form.Label>
                                <Form.Select aria-label="Default select example" value={this.state.project.category} name="category" onChange={this.handleChange}>

                                    {this.state.category.map((el,key) => (
                                        <option value={el.id} key={key}>{el.name}</option>
                                    ))}

                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>???????? ????????????????</Form.Label>
                                <Form.Control type="url" value={this.state.project.img} name={"img"} onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>???????? ????????????????????</Form.Label>
                                <Form.Control type="datetime-local" value={this.state.project.date} name="date" onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>????????????????</Form.Label>
                                <Form.Control as="textarea" rows={5} style={{resize: 'none'}} value={this.state.project.description} name="description" onChange={this.handleChange}/>
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="primary" onClick={() => {this.setState({modal: true})}}>
                        ??????????????????????????
                    </Button>
                    <Button variant="secondary" className="ms-3" onClick={() => this.setState({delete: true})}>
                        ??????????????
                    </Button>
                </Form>

                <Modal show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.data.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>???? ?????????????????????????? ???????????? ?????????????????? ??????????????????</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ??????
                        </Button>
                        <Button variant="primary" onClick={this.editData}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.delete} onHide={this.handleClose}>
                    <Modal.Body>???? ?????????????????????????? ???????????? ?????????????? ?????????????</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ??????
                        </Button>
                        <Button variant="primary" onClick={this.deleteData}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default FormPortfolio;