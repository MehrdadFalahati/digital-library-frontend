import React, {Component} from 'react';
import classes from './Libraries.css';

import BookShelf from './bookShelf/BookShelf'

class Libraries extends Component{
    render() {
        return (
            <div className={classes.Libraries}>
                <BookShelf />
            </div>
        );
    }
}

export default Libraries;