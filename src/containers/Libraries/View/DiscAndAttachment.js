import React, {Component} from 'react';
import classes from './LibraryView.css';
import axios from '../../../axios-library'

class DiscAndAttachment extends Component{

    state = {
        attachments:[]
    };

    componentDidMount() {
        this.fetchAttachment();
    }

    fetchAttachment = () => {
        axios.get('/books/content/'+this.props.contentId+'/attachment')
            .then(res => {
                this.setState({attachments:res.data})
            })
            .catch(err=> {
                console.log(err);
            });
    }

    render() {
        let link = null;
        if (this.state.attachments.length > 0) {
            link = this.state.attachments.map(attch => {
                return (
                    <a href={attch.fileUrl} key={attch.id}>{attch.name}</a>
                )
            })
        }
        return (
            <div className={classes.DescriptionCard}>
                <h1>توضیحات</h1>
                <div className={classes.Description}>
                     <p>{this.props.desc}</p>
                </div>
                {link}
            </div>
        );
    }
}
export default DiscAndAttachment;