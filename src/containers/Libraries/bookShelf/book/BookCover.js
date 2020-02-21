import React, { Component } from 'react';
import classes from './bookStyle.css';

class BookCover extends Component{
  render() {
    return (
      <div className={classes.BookCover}>
        <img src={this.props.img} />
      </div>
    );
  }
}

export default BookCover;