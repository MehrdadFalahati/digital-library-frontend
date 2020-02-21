import React, { Component } from 'react';
//import jsonReader from 'json-loader';
import classes from '../Libraries.css';
import Book from './book/Book';
//import bookInfo from '../../../books.json';

class Books extends Component {
  render() {
    let bookCards = [];
    for (let i=0; i<this.props.books.length; i++) {
      bookCards.push(<Book key={i} name={this.props.books[i].name}
                           img={this.props.books[i].imageUrl}
                           rate={this.props.books[i].rate}
                           voters={this.props.books[i].countLike}
                           contentId={this.props.books[i].id}
                           description={this.props.books[i].description} />);
    }
    return (
      <div className={classes.Books}>
        {bookCards}
      </div>
    );
  }
}

export default Books;