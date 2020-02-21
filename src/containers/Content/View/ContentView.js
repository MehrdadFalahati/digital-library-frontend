import React, {Component} from 'react';
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import moment from 'jalali-moment';

import * as actions from "../../../store/actions/index";
import {connect} from 'react-redux';

import classes from './ContentView.css';
import ContentAttachment from '../ContentAttachment/ContentAttachment'

class ContentView extends Component{
    componentDidMount() {
        this.props.onLoadContent(this.props.token, this.props.match.params.id);
        moment.locale('fa', { useGregorianParser: true });
    }

    onClick = e => {
        e.preventDefault();
        this.props.history.push('/content');
    };

    render() {
        let view = <Spinner animation="border" size="sm"/>;
        if (!this.props.loading && this.props.content !== null) {
            view = (
                <div dir="rtl" className="col-xs-12">
                    <Row>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{this.props.content.id}</div>
                                    </Col>
                                    <Form.Label column sm={2}>شناسه</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{this.props.content.name}</div>
                                    </Col>
                                    <Form.Label column sm={2}>نام</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark"><a href={this.props.content.downloadFileDataLink}>{this.props.content.downloadFileDataLink}</a></div>
                                    </Col>
                                    <Form.Label column sm={2}>لینک دانلود عکس محتوا</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{moment(this.props.content.buyDate).format('YYYY/MM/DD')}</div>
                                    </Col>
                                    <Form.Label column sm={2}>تاریخ خرید</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{this.props.content.contentTypeToStr}</div>
                                    </Col>
                                    <Form.Label column sm={2}>نوع محتوا</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col xs="4" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{this.props.content.libraryToStr}</div>
                                    </Col>
                                    <Form.Label column sm={2}>کتابخانه</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="12">
                            <Form.Group>
                                <Row>
                                    <Col sm={10}>
                                        <div className="form-control input-sm input-back-silver bg-light text-dark">{this.props.content.description}</div>
                                    </Col>
                                    <Form.Label column sm={2}>توضیحات</Form.Label>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            );
        }


        return (
            <div dir="rtl" className={classes.ContentView}>
                    <Card>
                        <Card.Header>
                            <h3>مشاهده محتوا</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" sm="12">
                                    <Card>
                                        <Card.Body>
                                            {view}
                                        </Card.Body>
                                        <Card.Body>
                                            <Col xs="12">
                                                <Row>
                                                    <Col xs="1">
                                                        <Form.Group>
                                                            <Button block color="info" onClick={this.onClick}>
                                                                بازگشت
                                                            </Button>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {!this.props.loading && this.props.content !== null ?<Row>
                                <Col xs="12" sm="12">
                                    <Card>
                                        <Card.Body>
                                            <ContentAttachment contentId={this.props.match.params.id}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>:null }
                        </Card.Body>
                    </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        content: state.content.content,
        loading: state.content.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadContent: (token, id) => dispatch( actions.loadContent(token, id) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentView);