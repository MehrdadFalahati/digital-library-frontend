import React, { Component } from 'react';
import classes from '../Libraries.css';
import PopularBy from './PopularBy';
import NavBar from './NavBar';
import SearchBook from './SearchBook'

class NavigationPanel extends Component {
  onCategorySelect = (filter) => {
    this.props.onMainFilterClick(filter);
  }
  render() {
    return (
      <div className={classes.NavigationPanel}>
        <SearchBook />
        <NavBar onFilterClick={this.onCategorySelect} activeTab={this.props.activeTab} libraries={this.props.libraries}/>
      </div>
    );
  }
}

export default NavigationPanel;