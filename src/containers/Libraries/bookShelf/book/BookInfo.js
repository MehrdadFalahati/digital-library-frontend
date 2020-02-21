import React, { Component } from 'react';
import classes from './bookStyle.css';
import Rate from '../../../sharedComponents/Rate';
import BookDescription from './BookDescription';

class BookInfo extends Component{
  render() {
    const textColor = '#607D8B';
    return (
      <div className={classes.BookInfo}>
        <h2>{this.props.name}</h2>
        <Rate rate={this.props.rate} voters={this.props.voters} textColor={textColor} />
        <BookDescription description={this.props.description} />
      </div>
    );
  }
}

export default BookInfo;