import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './LibraryEdit.css';
import {checkValidity, updateObject} from '../../../shared/utility';

import axios from '../../../axios-library';

import AsyncSelect from 'react-select/async';

class LibraryEdit extends Component {
    state = {
        libraryForm: {
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
        formIsValid: false,
        inputValue: '',
        contentTypes: [],
        selectedOption: null
    };
    componentDidMount() {
        this.filterContentType('');
    }

    handleSaveBtnClick = () => {
        const {onSave} = this.props;
        const libraryRequest = {
            title: this.state.libraryForm.title.value,
            code: this.state.libraryForm.code.value,
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

        const updatedFormElement = updateObject(this.state.libraryForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.libraryForm[inputIdentifier].validation),
            touched: true
        });
        const updatedLibraryForm = updateObject(this.state.libraryForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedLibraryForm) {
            formIsValid = updatedLibraryForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contentForm: updatedLibraryForm, formIsValid: formIsValid});
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

    loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(this.filterContentType(inputValue));
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
    }

    render() {
        const {
            onModalClose,
            onSave,
            columns,
        } = this.props;

        const formElementsArray = [];
        for (let key in this.state.libraryForm) {
            formElementsArray.push({
                id: key,
                config: this.state.libraryForm[key]
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
            <div dir="rtl" style={{backgroundColor: '#eeeeee', marginTop: "100px"}} className={classes.LibraryEdit}>
                <h4>فرم ایجاد کتابخانه</h4>
                {form}
                <div style={{margin: "20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions={this.state.contentTypes}
                        onInputChange={this.handleSelectChange}
                        onChange={this.inputSelectedHandler}
                        placeholder="انتخاب نوع محتوا"
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

export default connect(mapStateToProps)(LibraryEdit);