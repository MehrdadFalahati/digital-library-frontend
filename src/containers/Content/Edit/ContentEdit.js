import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './ContentEdit.css';
import {checkValidity, updateObject} from '../../../shared/utility';

import axios from '../../../axios-library';

import AsyncSelect from 'react-select/async';
import moment from 'jalali-moment'
import DatePicker from "react-datepicker2/dist";
import {ProgressBar} from 'react-bootstrap';

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
            rate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'سطح محبوبیت'
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
        },
        selectedFile: null,
        fileId: null,
        buyDate:null,
        dateValue: null
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
            rate: this.state.contentForm.rate.value,
            buyDate: this.state.buyDate,
            contentType: {
                id: this.state.selectedOption.contentType !== null ? this.state.selectedOption.contentType.value:null,
                title: this.state.selectedOption.contentType !== null ?this.state.selectedOption.contentType.label:null
            },
            library: {
                id: this.state.selectedOption.library !== null ? this.state.selectedOption.library.value:null,
                title: this.state.selectedOption.library !== null ?this.state.selectedOption.library.label:null
            },
            contentData : {
                id: this.state.fileId
            }
        };
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.post("/content/save-update", libraryRequest, config)
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
            callback(this.selectContentType(inputValue));
        }, 1000);
    };

    selectContentType = (inputValue) => {
        return this.state.contentTypes.filter(i =>
            i.label.includes(inputValue)
        );
    }

    loadLibraryOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(this.selectLibrary(inputValue));
        }, 1000);
    };

    selectLibrary = (inputValue) => {
        return this.state.libraries.filter(i =>
            i.label.includes(inputValue)
        );
    }

    inputSelectedHandler = (selectedValue, name) => {
        const updatedSelectOption = {
            ...this.state.selectedOption,
            [name]: selectedValue
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

    changeDateHandler = (event) => {
        const updatedBuyDate = moment(event.value.format('jYYYY/jMM/jDD HH:mm:ss'), 'YYYY-M-D HH:mm:ss').toDate();
        this.setState({buyDate:updatedBuyDate, dateValue: event.value})
    }


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
            <div dir="rtl" style={{backgroundColor: '#eeeeee', marginTop: "55px"}} className={classes.ContentEdit}>
                <h4>فرم ایجاد محتوا</h4>
                {form}
                <div style={{margin: "20px 10px"}}>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    <ProgressBar animated={true} max="100" variant="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</ProgressBar>
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>آپلود فایل
                    </button>
                </div>
                <div style={{margin: "20px 10px"}}>
                    <DatePicker
                        onChange={(value)=>this.changeDateHandler({ value })}
                        value={this.state.dateValue}
                        isGregorian={false}
                        placeholder="تاریخ خرید"
                    />
                </div>
                <div style={{margin: "20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions={this.state.contentTypes}
                        onChange={(event)=>this.inputSelectedHandler(event,'contentType')}
                        placeholder="انتخاب نوع محتوا"
                    />
                </div>
                <div style={{margin: "0 10px 20px 10px"}}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadLibraryOptions}
                        defaultOptions={this.state.libraries}
                        onChange={(event)=>this.inputSelectedHandler(event,'library')}
                        placeholder="انتخاب کتابخانه"
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