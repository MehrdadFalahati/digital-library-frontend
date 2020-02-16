import React, {Component} from 'react';
import {BootstrapTable, DeleteButton, InsertButton, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

import ContentTypeEdit from './Edit/ContentTypeEdit';
import classes from './ContentType.css';
import axios from '../../axios-library';

class ContentType extends Component {
    componentDidMount() {
        this.props.onFetchContentTypes(this.props.token);
    }

    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <ContentTypeEdit {...attr} />
        );
    };

    handleInsertButtonClick = (onClick) => {
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='ایجاد نوع محتوا جدید'
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
        axios.delete("/content-type/remove/" + row.toString(), config)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {


        let table = null;
        if (!this.props.loading && this.props.contentTypes !== null) {
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
                <BootstrapTable dataAlign="right" data={this.props.contentTypes} selectRow={selectRowProp}
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
                </BootstrapTable>
            )
        }


        return (
            <div dir="rtl" className={classes.ContentType}>
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contentTypes: state.contentTypes.contentTypes,
        loading: state.contentTypes.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchContentTypes: (token, page, size) => dispatch(actions.fetchContentTypes(token, page, size))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentType);