import React, {Component} from 'react';

import {BootstrapTable, InsertButton, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

import classes from './ContentAttachment.css';
import axios from '../../../axios-library';
import ContentAttachmentEdit from './Edit/ContentAttachmentEdit'

class ContentAttachment extends Component {
    componentDidMount() {
        this.props.onFetchContentAttachments(this.props.token, this.props.contentId);
    }

    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const contentId = this.props.contentId;
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable, contentId
        };
        return (
            <ContentAttachmentEdit {...attr} />
        );
    };

    handleInsertButtonClick = (onClick) => {
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='ایجاد پیوست جدید'
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
        axios.delete("/content-attachment/remove/" + row.toString(), config)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
    };

    viewFormatter = (cell, row) => {
        return (<a href={row.downloadFileLink}>فایل</a>)
    }

    render() {

        let table = null;
        if(!this.props.loading && this.props.contentAttachments !== null ) {

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
                <BootstrapTable dataAlign="right" data={this.props.contentAttachments} selectRow={selectRowProp}
                                options={options}
                                striped
                                hover
                                condensed
                                pagination
                                insertRow
                                deleteRow
                                search>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="id" isKey={true}>شناسه</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="name">نام</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="attachmentTypeToStr">نوع پیوست</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataFormat={ this.viewFormatter } dataAlign="right" dataField="downloadFileLink">لینک فایل پیوست</TableHeaderColumn>
                </BootstrapTable>
            );
        }


        return (
            <div dir="rtl" className={classes.ContentAttachment}>
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contentAttachments: state.contentAttachments.contentAttachments,
        loading: state.contentAttachments.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchContentAttachments: (token, id) => dispatch(actions.fetchContentAttachments(token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentAttachment);