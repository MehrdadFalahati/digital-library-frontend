import React, { Component } from 'react';
import classes from '../Libraries.css';
import {FaSearch} from 'react-icons/fa';

class SearchBook extends Component {
  render() {
    return (
      <div className={classes.SearchBook}>
        <FaSearch className={classes.iconSearch}/>
        <input placeholder="جستجو"/>
      </div>
    );
  }
}

export default SearchBook;