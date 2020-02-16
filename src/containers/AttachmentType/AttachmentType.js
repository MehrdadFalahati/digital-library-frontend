import React, {Component} from 'react';
import {BootstrapTable, InsertButton, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

import AttachmentTypeEdit from "./Edit/AttachmentTypeEdit";
import classes from './AttachmentType.css';
import axios from '../../axios-library';
class AttachmentType extends Component{
    componentDidMount() {
        this.props.onFetchAttachmentTypes(this.props.token);
    }

    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <AttachmentTypeEdit {...attr} />
        );
    };

    handleInsertButtonClick = (onClick) => {
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='ایجاد نوع پیوست جدید'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={() => this.handleInsertButtonClick(onClick)}/>
        );
    };

    handleDeleteButtonClick = (onClick) => {
        onClick();
    };

    createCustomDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='حذف'
                btnContextual='btn-danger'
                className='my-custom-class'
                btnGlyphicon='glyphicon-trash'
                onClick={ e => this.handleDeleteButtonClick(onClick) }/>
        );
    };

    onDeletedRow = (row) => {
        console.log(row);
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.delete("/attachment-type/remove/" + row.toString(), config)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {

        let table = null;
        if(!this.props.loading && this.props.attachmentTypes !== null) {
            console.log(this.props.attachmentTypeTableParams)
            const selectRowProp = {
                mode: "checkbox",
                clickToSelect: true,
                bgColor: "rgb(238, 193, 213)"
            };
            const options = {
                insertModal: this.createCustomModal,
                insertBtn: this.createCustomInsertButton,
                onDeleteRow: this.onDeletedRow,
                deleteBtn: this.createCustomDeleteButton,
            };

            table = (
                <BootstrapTable dataAlign="right" data={this.props.attachmentTypes}
                                selectRow={selectRowProp}
                                options={options}
                                striped
                                hover
                                condensed
                                pagination
                                insertRow
                                deleteRow
                                search>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="id" isKey={true}>شناسه</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="code">کد</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="title">عنوان</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="contentTypeToStr">عنوان نوع محتوا</TableHeaderColumn>
                </BootstrapTable>
            );
        }


        return (
            <div dir="rtl" className={classes.AttachmentType}>
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        attachmentTypes: state.attachmentTypes.attachmentTypes,
        loading: state.attachmentTypes.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAttachmentTypes: (token, page, size) => dispatch(actions.fetchAttachmentTypes(token, page, size))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AttachmentType);