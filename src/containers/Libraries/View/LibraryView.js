import React, {Component} from 'react'
import moment from "jalali-moment";
import ImageCover from './ImageCover';

import DiscAndAttachment from './DiscAndAttachment';
import Comments from './Comment/Comments';
import CommentBox from './Comment/CommentBox';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import classes from './LibraryView.css'


class LibraryView extends Component{
    componentDidMount() {
        this.props.onLoadBooks(this.props.match.params.id);
        moment.locale('fa', { useGregorianParser: true });
    }
    render() {
        let show = <Spinner />;
        if ( !this.props.loading && this.props.book !== null) {
            show = (
                <div >
                    <ImageCover img={this.props.book.imageUrl} name={this.props.book.name}
                            rate={this.props.book.rate} voter={this.props.book.countLike}/>

                    <DiscAndAttachment desc={this.props.book.description} contentId={this.props.match.params.id}/>
                    {this.props.isAuthenticated ? <div className={classes.CommentCard}><section className="section">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-half is-offset-one-quarter">
                                    <CommentBox contentId={this.props.match.params.id} token={this.props.token} />
                                    <Comments contentId={this.props.match.params.id} token={this.props.token} />
                                </div>
                            </div>
                        </div>
                    </section></div>:<div className={classes.CommentCard}><h1>برای مشاهده و ثبت نظر خود ابتدا در سایت ثبت نام کنید. باتشکر</h1></div>}
                </div>)
        }

        return (
            <div dir="rtl">
                {show}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        book: state.books.book,
        loading: state.books.loading,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadBooks: (contentId) => dispatch(actions.loadBook(contentId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryView);