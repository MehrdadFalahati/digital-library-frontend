import React, { Component } from 'react';
import classes from '../Libraries.css';
import bookInfo from '../../../books.json';

class NavBar extends Component {
  onFilterSelect = (category) => {
    this.props.onFilterClick(category);
  }
  render() {
    const categories = this.props.libraries.map((library, index) => {
      let categoryName = library.title;
      let style = classes.CategoryButton +' ' + (this.props.activeTab == library.id ? classes.CategoryButtonActive : '');
      return (
        <button key={index} onClick={() => this.onFilterSelect(library.id)} className={style}>{categoryName}</button>
      )
    });
    return (
      <div className={classes.NavBar}>
        {categories}
      </div>
    );
  }
}

export default NavBar;