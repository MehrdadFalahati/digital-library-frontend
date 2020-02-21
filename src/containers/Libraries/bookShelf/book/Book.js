import React, { Component } from 'react';
import classes from './bookStyle.css';
import BookCover from './BookCover';
import BookInfo from './BookInfo';
import Continue from './Continue';
import {FaRegHeart, FaHeart} from 'react-icons/fa';

import {connect} from 'react-redux';

import axios from '../../../../axios-library';

class Book extends Component{
  constructor(props) {
		super(props);
		this.state = {
			liked: false,
            voters: this.props.voters
		};
	}
	componentDidMount() {
      if (this.props.isAuthenticated) {
          this.loadLike();
      }
    }

	loadLike = () => {
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`}
        };
        axios.get('/feedback/content/' + this.props.contentId + '/emotion', config)
            .then(res=> {
                this.setState({liked: res.data});
            })
            .catch(err => {
                console.log(err)
            });
    }

  isLiked = (emotion) => {
      const emotionData = {
        type: emotion
      };
      const config = {
          headers: {Authorization: `Bearer ${this.props.token}`}
      };
      axios.post('/feedback/content/' + this.props.contentId + '/emotion/add', emotionData, config)
          .then(res=> {
              let voters = this.state.voters;
              if (res.data) {
                  voters = voters + 1;
              } else {
                  voters = voters - 1;
              }
              this.setState({liked: res.data, voters:voters});
          })
          .catch(err => {
              console.log(err)
          });



	};

  render() {
    let like = null;
    if (this.state.liked) {
      like = <FaHeart className={classes.icon} onClick={()=>{this.isLiked('DISLIKE')}} />
    } else {
      like = <FaRegHeart className={classes.icon} onClick={()=>{this.isLiked('LIKE')}} />
    }
    return (
      <div className={classes.Book}>
        <BookCover img={this.props.img}/>
        <BookInfo name={this.props.name} description={this.props.description}
        rate={this.props.rate} voters={this.state.voters}/>
        {this.props.isAuthenticated ? like:null}
        <Continue contentId={this.props.contentId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    };
};

export default connect(mapStateToProps) (Book);