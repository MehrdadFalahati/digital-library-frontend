import React, { Component } from 'react';
import {BootstrapTable, InsertButton, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

import ContentEdit from './Edit/ContentEdit';
import classes from './Content.css';
import axios from '../../axios-library';
import moment from 'jalali-moment'
import { Redirect } from 'react-router-dom';

class Content extends Component {
    state = {
        id:null
    };

    componentDidMount() {
        this.props.onFetchContent(this.props.token);
    }

    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <ContentEdit {...attr} />
        );
    };

    handleInsertButtonClick = (onClick) => {
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='ایجاد محتوا جدید'
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
        axios.delete("/content/remove/" + row.toString(), config)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
    };

    dateFormatter = (column, colIndex) => {
        moment.locale('fa', { useGregorianParser: true });

        return (
            <span>{moment(column.test).format('YYYY/MM/DD')}</span>
        );
    };

    viewFormatter = (cell, row) => {
        return (
                <button style={{marginLeft:"5px"}} onClick={() => this.openViewHandler(row.id)} className='btn btn-info'>مشاهده</button>
        )
    };

    openViewHandler = (id) => {
        this.setState({id:id});
        return (<Redirect to={`/view-content/${id}`} />);
    };

    renderRedirect = () => {
        if (this.state.id) {
            return <Redirect to={`/view-content/${this.state.id}`} />
        }
    };

    render() {

        let table = null;
        if(!this.props.loading && this.props.contents !== null ) {

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
                <BootstrapTable dataAlign="right" data={this.props.contents} selectRow={selectRowProp}
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
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="buyDate" dataFormat={this.dateFormatter}>تاریخ خرید</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataAlign="right" dataField="description">توضیحات</TableHeaderColumn>
                    <TableHeaderColumn width="200px" dataFormat={ this.viewFormatter } dataAlign="right" columnTitle>مشاهده</TableHeaderColumn>
                </BootstrapTable>
            );
        }


        return (
            <div dir="rtl" className={classes.Content}>
                {this.renderRedirect()}
                {table}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contents: state.content.contents,
        loading: state.content.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: (token) => dispatch(actions.fetchContents(token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);