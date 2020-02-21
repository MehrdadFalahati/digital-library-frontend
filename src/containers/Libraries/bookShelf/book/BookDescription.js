import React, { Component } from 'react';
import classes from './bookStyle.css';

class BookDescription extends Component{
  render() {
    return (
      <div className={classes.BookDescription}>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default BookDescription;