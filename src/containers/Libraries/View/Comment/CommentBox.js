import React, { Component } from 'react';
import axios from '../../../../axios-library';
import classes from "./Comment.css"

class CommentBox extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        disabled:false
    };

    addComment = (e) => {
        // Prevent the default behaviour of form submit
        e.preventDefault();

        // Get the value of the comment box
        // and make sure it not some empty strings
        const comment = e.target.elements.comment.value.trim();
        // Make sure name and comment boxes are filled
        if (comment) {
            const commentObject = { comment:comment };

            const config = {
                headers: {Authorization: `Bearer ${this.props.token}`}
            };
            axios.post('/feedback/content/'+ this.props.contentId +'/comment/add', commentObject, config)
                .then(res=>{
                    console.log(res.data)
                    window.location.reload(true)
                })
                .catch(err => {
                    console.log(err)
                });

            // Clear input fields
            e.target.elements.comment.value = '';

        }
    };

    onChangeHandler = (e) => {
        if (e.target.value.trim() !== '') {
            this.setState({disabled:true})
        } else {
            this.setState({disabled:false})
        }
    }

    render() {
        return (
            <div>
                <h1>نظرات</h1>
                <form onSubmit={this.addComment}>
                    <div>
                        <div>
                            <textarea className={classes.TextAria} onChange={this.onChangeHandler} name="comment" placeholder="نظر خود را بنویسید" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className={classes.SubmitButton} disabled={!this.state.disabled}>ثبت نظر</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CommentBox;