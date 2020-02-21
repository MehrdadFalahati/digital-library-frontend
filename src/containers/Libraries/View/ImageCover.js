import React, {Component} from 'react';
import classes from './LibraryView.css';
import RateAndLike from './RateAndLike';

class ImageCover extends Component {
    render() {

        return (
            <div className={classes.BookCard}>
                <div className={classes.Info}>
                    <h1>{this.props.name}</h1>
                    <div className={classes.RateView}>
                        <RateAndLike rate={this.props.rate} voters={this.props.voter} textColor="#FFFFFF"/>
                    </div>
                </div>
                {/*<div className={classes.Info}>
                </div>*/}
                <div className={classes.Cover}>
                    <img src={this.props.img} />
                </div>
            </div>
        );
    }
}

export default ImageCover;