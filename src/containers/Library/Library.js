import React, { Component } from 'react';
import {BootstrapTable, InsertButton, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

import LibraryEdit from './Edit/LibraryEdit';
import classes from './Library.css';
import axios from '../../axios-library';

class Library extends Component {
    state = {
        data: []
    };
    componentDidMount() {
        this.props.onFetchLibrary(this.props.token);
    }

    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <LibraryEdit {...attr} />
        );
    };

    handleInsertButtonClick = (onClick) => {
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='ایجاد کتابخانه جدید'
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
        axios.delete("/library/remove/" + row.toString(), config)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {

        let table = null;
        if(!this.props.loading && this.props.libraryList !== null ) {

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
                <BootstrapTable dataAlign="right" data={this.props.libraryList} selectRow={selectRowProp}
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
            <div dir="rtl" className={classes.Library}>
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        libraryList: state.library.libraryList,
        loading: state.library.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchLibrary: (token, page, size) => dispatch(actions.fetchLibrary(token, page, size))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Library);