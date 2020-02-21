import React, {Component} from 'react';
import {MdStarBorder, MdStarHalf, MdStar} from 'react-icons/md'
import classes from './LibraryView.css'

class RateAndLike extends Component {
    render() {
        let fullStar = parseInt(this.props.rate, 10);
        let halfStar = 0;
        let emptyStar = 0;
        if ((parseFloat(this.props.rate) - fullStar) >= 0.3 && (parseFloat(this.props.rate) - fullStar) <= 0.8) {
            halfStar = 1;
        } else if ((parseFloat(this.props.rate) - fullStar) > 0.8) {
            fullStar += 1;
        }
        emptyStar = 5 - fullStar - halfStar;

        let stars = [];

        let index = 0;
        for (let i = 0; i < fullStar; i++, index++) {
            stars.push(<MdStar key={index} />);
        }
        for (let i = 0; i < halfStar; i++, index++) {
            stars.push(<MdStarHalf key={index} />);
        }
        for (let i = 0; i < emptyStar; i++, index++) {
            stars.push(<MdStarBorder key={index} />);
        }

        return (
            <div className={classes.Rate} style={this.props.color}>
                {stars}
                <span style={{color: this.props.textColor}}> تعداد لایک {this.props.voters}</span>
            </div>
        );
    }
}

export default RateAndLike;