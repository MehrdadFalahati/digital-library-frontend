import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './ContentTypeEdit.css';
import {checkValidity, updateObject} from '../../../shared/utility';

import axios from '../../../axios-library';

class ContentTypeEdit extends Component {
    state = {
        contentTypeForm: {
            code: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'کد'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'عنوان'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    };

    handleSaveBtnClick = () => {
        const {onSave} = this.props;
        const contentTypeRequest = {
            title: this.state.contentTypeForm.title.value,
            code: this.state.contentTypeForm.code.value
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.post("/content-type/save-update", contentTypeRequest, config)
            .then(response => {
                // You should call onSave function and give the new row
                onSave(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.contentTypeForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.contentTypeForm[inputIdentifier].validation),
            touched: true
        });
        const updatedContentTypeForm = updateObject(this.state.contentTypeForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedContentTypeForm) {
            formIsValid = updatedContentTypeForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contentTypeForm: updatedContentTypeForm, formIsValid: formIsValid});
    }

    render() {
        const {
            onModalClose,
            onSave,
            columns,
        } = this.props;

        const formElementsArray = [];
        for (let key in this.state.contentTypeForm) {
            formElementsArray.push({
                id: key,
                config: this.state.contentTypeForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
            </form>
        );

        return (
            <div dir="rtl" style={{backgroundColor: '#eeeeee', marginTop: "100px"}} className={classes.ContentTypeEdit}>
                <h4>فرم ایجاد نوع محتوا</h4>
                {form}
                <div>
                    <button className='btn btn-success' style={{marginLeft: "10px"}}
                            onClick={() => this.handleSaveBtnClick(columns, onSave)}>ایجاد
                    </button>
                    <button className='btn btn-danger' onClick={onModalClose}>بازگشت</button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(ContentTypeEdit);