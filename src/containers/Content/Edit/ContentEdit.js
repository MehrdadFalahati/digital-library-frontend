import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './ContentEdit.css';
import {checkValidity, updateObject} from '../../../shared/utility';

import axios from '../../../axios-library';

import AsyncSelect from 'react-select/async';

class ContentEdit extends Component {
    state = {
        contentForm: {
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
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'توضیحات'
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
        contentTypes: [],
        libraries: [],
        selectedOption: {
            contentType:null,
            library:null
        }
    };

    componentDidMount() {
        this.filterContentType('');
        this.filterLibrary('')
    }

    handleSaveBtnClick = () => {
        const {onSave} = this.props;
        const libraryRequest = {
            name: this.state.contentForm.name.value,
            description: this.state.contentForm.description.value,
            contentType: {
                id: this.state.selectedOption.value,
                title: this.state.selectedOption.label
            }
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.post("/library/save-update", libraryRequest, config)
            .then(response => {
                // You should call onSave function and give the new row
                onSave(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.contentForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.contentForm[inputIdentifier].validation),
            touched: true
        });
        const updatedContentForm = updateObject(this.state.contentForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedContentForm) {
            formIsValid = updatedContentForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contentForm: updatedContentForm, formIsValid: formIsValid});
    };

    filterContentType = (inputValue) => {
        const params = {
            title:inputValue
        }
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            params:params
        };
        axios.get("/content-type/search/" + inputValue, config)
            .then(response => {
                this.setState({contentTypes:response.data});
                return response.data;
            }).catch(err => {
            console.log(err);
        });
    };

    filterLibrary = (inputValue) => {
        const params = {
            title:inputValue
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            params:params
        };
        axios.get("/library/search/" + inputValue, config)
            .then(response => {
                this.setState({libraries:response.data});
                return response.data;
            }).catch(err => {
            console.log(err);
        });
    };

    loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(this.filterContentType(inputValue));
        }, 1000);
    };

    loadLibraryOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(this.filterLibrary(inputValue));
        }, 1000);
    };

    handleSelectChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue:inputValue });
        return inputValue;
    };

    inputSelectedHandler = (selectedValue, name) => {
        const updatedSelectOption = {
            ...this.state.selectedOption,
            [name]: selectedValue
        };
        console.log(updatedSelectOption)
        this.setState({selectedOption: updatedSelectOption},
            () => console.log(`Option selected:`, this.state.selectedOption));
    };


    render() {
        const {
            onModalClose,
            onSave,
            columns,
        } = this.props;

        const formElementsArray = [];
        for (let key in this.state.contentForm) {
            formElementsArray.push({
                id: key,
                config: this.state.contentForm[key]
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
            <div dir="rtl" style={{backgroundColor: '#eeeeee', marginTop: "100px"}} className={classes.ContentEdit}>
                <h4>فرم ایجاد محتوا</h4>
                {form}
                <div style={{margin: "20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions={this.state.contentTypes}
                        onInputChange={this.handleSelectChange}
                        onChange={(event)=>this.inputSelectedHandler(event,'contentType')}
                    />
                </div>
                <div style={{margin: "0 10px 20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadLibraryOptions}
                        defaultOptions={this.state.libraries}
                        onInputChange={this.handleSelectChange}
                        onChange={(event)=>this.inputSelectedHandler(event,'library')}
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

export default connect(mapStateToProps)(ContentEdit);