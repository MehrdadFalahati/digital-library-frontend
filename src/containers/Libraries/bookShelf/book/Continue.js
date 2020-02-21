import React, { Component } from 'react';
import classes from './bookStyle.css';

import { Redirect } from 'react-router-dom';

class Continue extends Component {
    onClickHandler = () => {
      return (<Redirect to={`/book-view/${this.props.contentId}`}/>)
    }

  render() {
    const uri = "/book-view/" + this.props.contentId;

    return (
      <div className={classes.Likes}>
        <a href={uri} onClick={this.onClickHandler}>ادامه مطلب</a>
      </div>
    );
  }
}

export default Continue;