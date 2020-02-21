import React, { Component } from 'react';
import classes from '../Libraries.css';
import NavigationPanel from './NavigationPanel';
import Books from './Books';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class BookShelf extends Component {
    state = {
        activeFilter: 1,
    };
	componentDidMount() {
      this.props.onFetchLibraries();
      this.fetchBooks(this.state.activeFilter);
    }
  
  onFilterChange = (filter) => {
    this.setState({activeFilter: filter});
    this.fetchBooks(filter);
  };
	fetchBooks = (libraryId) => {
	    this.props.onFetchBooks(libraryId);
    }
  render() {


    return (
      <div className={classes.BookShelf}>
        <NavigationPanel onMainFilterClick={this.onFilterChange} activeTab={this.state.activeFilter} libraries={this.props.libraries}/>
        <Books books={this.props.books} />
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        books: state.books.books,
        libraries: state.books.libraries,
        loading: state.books.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBooks: (libraryId) => dispatch(actions.fetchBooks(libraryId)),
        onFetchLibraries: () => dispatch(actions.fetchLibraryBooks()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);