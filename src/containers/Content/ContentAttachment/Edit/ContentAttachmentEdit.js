import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../../../components/UI/Input/Input';
import classes from './ContentAttachmentEdit.css';
import {checkValidity, updateObject} from '../../../../shared/utility';

import axios from '../../../../axios-library';

import AsyncSelect from 'react-select/async';
import {ProgressBar} from "react-bootstrap";

class ContentAttachmentEdit extends Component {
    state = {
        attachmentForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        inputValue: '',
        attachmentTypes: [],
        selectedOption: null,
        selectedFile: null,
        fileId: null,
    };
    componentDidMount() {
        this.filterAttachmentType('');
    }

    handleSaveBtnClick = () => {
        const {onSave} = this.props;
        const attachmentRequest = {
            name: this.state.attachmentForm.name.value,
            content: {
                id: this.props.contentId,
            },
            attachmentType: {
                id: this.state.selectedOption.value,
                title: this.state.selectedOption.label
            },
            attachmentData : {
                id: this.state.fileId
            }
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.post("/content-attachment/save-update", attachmentRequest, config)
            .then(response => {
                // You should call onSave function and give the new row
                onSave(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.attachmentForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.attachmentForm[inputIdentifier].validation),
            touched: true
        });
        const updatedAttachmentForm = updateObject(this.state.attachmentForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedAttachmentForm) {
            formIsValid = updatedAttachmentForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({attachmentForm: updatedAttachmentForm, formIsValid: formIsValid});
    };

    filterAttachmentType = (inputValue) => {
        const params = {
            title:inputValue
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            params:params
        };
        axios.get("/attachment-type/search", config)
            .then(response => {
                console.log(response.data)
                this.setState({attachmentTypes:response.data});
                return response.data;
            }).catch(err => {
            console.log(err);
        });
    };

    loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(this.filterAttachmentType(inputValue));
        }, 1000);
    };

    handleSelectChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue:inputValue });
        return inputValue;
    };

    inputSelectedHandler = (selectedValue) => {
        const updatedSelectOption = {
            ...this.state.selectedOption,
            value: selectedValue.value,
            label: selectedValue.label
        };
        console.log(updatedSelectOption)
        this.setState({selectedOption: updatedSelectOption},
            () => console.log(`Option selected:`, this.state.selectedOption));
    };

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })}
        };
        axios.post("/files/upload-file", data, config)
            .then(res => { // then print response status
                console.log(res)
                this.setState({fileId:res.id});
            }).catch(err => {
            console.log(err)
        })
    };

    render() {
        const {
            onModalClose,
            onSave,
            columns,
        } = this.props;

        const formElementsArray = [];
        for (let key in this.state.attachmentForm) {
            formElementsArray.push({
                id: key,
                config: this.state.attachmentForm[key]
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
            <div dir="rtl" style={{backgroundColor: '#eeeeee', marginTop: "100px"}} className={classes.ContentAttachmentEdit}>
                <h4>فرم ایجاد کتابخانه</h4>
                {form}
                <div style={{margin: "20px 10px"}}>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    <ProgressBar animated={true} max="100" variant="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</ProgressBar>
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>آپلود فایل
                    </button>
                </div>
                <div style={{margin: "20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions={this.state.attachmentTypes}
                        onInputChange={this.handleSelectChange}
                        onChange={this.inputSelectedHandler}
                        placeholder="انتخاب نوع پیوست"
                    />
                </div>
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

export default connect(mapStateToProps)(ContentAttachmentEdit);