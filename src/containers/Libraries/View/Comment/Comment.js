import React, { Component } from 'react';
import classes from './Comment.css'

class Comment extends Component {
    render() {
        return (
            <article className={classes.CommentBody}>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong className={classes.Name}>{this.props.comment.personToStr}</strong>
                            <br />
                            <span className={classes.Comment}>{this.props.comment.comment}</span>
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}

export default Comment;