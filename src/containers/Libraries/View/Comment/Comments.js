import React, { Component } from 'react';
import Comment from './Comment';
import axios from '../../../../axios-library';

class Comments extends Component {
    state = {
        comments:[]
    };
    componentDidMount() {
        this.fetchComments();
    }
    fetchComments = ()=> {
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.get('/feedback/content/'+ this.props.contentId + '/comment/fetch', config)
            .then(res=> {
                this.setState({comments:res.data.content});
            })
            .catch(err=> {
                console.log(err)
            });
    }

    render() {
        return (
            <section className="section">
                {
                    this.state.comments.length > 0 ? this.state.comments.map((comment, index) => {
                        return <Comment key={index} comment={comment} />
                    }):null
                }
            </section>
        );
    }
}

export default Comments;