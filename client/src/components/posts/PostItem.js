import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import {
  addLike,
  removeLike,
  deletePost,
  // addCommentArray,
} from '../../actions/post';
import CommentItemArray from './CommentItemArray';
import CommentsForm from '../posts/CommentsForm';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, avatar, text, user, likes, comments, date },
  postId,
  showActions,
  // addCommentArray,
}) => {
  const [showComments, toggleShowComments] = useState(false);

  // const onHandleComment = (e) => {
  //   comments.length > 0
  //     ? console.log('theres comments')
  //     : console.log('theres no comment');
  // };

  return (
    <Fragment>
      <div className='post-body'>
        <div className='post'>
          <div>
            <Link to={`/profile/${user}`}>
              <img src={avatar} alt='' />
            </Link>
          </div>
          <div>
            <div className='post-user'>
              <Link to={`/profile/${user}`}>
                <h3>{name}</h3>
              </Link>
              <Link
                to={`/posts/${_id}`}
                className='btn'
                title='Go to single post'
              >
                <i className='fa fa-ellipsis-h' aria-hidden='true'></i>
              </Link>
              {!auth.loading && auth.user._id === user ? (
                <button type='button' onClick={(e) => deletePost(_id)}>
                  <i className='fa fa-times-circle' aria-hidden='true'></i>
                </button>
              ) : null}
            </div>
            <div className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </div>
            <p className='my-1'>{text}</p>
            <div>
              {showActions && (
                <Fragment>
                  {!auth.loading &&
                  likes.some(({ user }) => user === auth.user._id) ? (
                    <button
                      onClick={(e) => removeLike(_id)}
                      className='btn btn-light heart'
                      type='button'
                    >
                      <i className='fa fa-heart heart-red'></i>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => addLike(_id)}
                      className='btn btn-light heart'
                      type='button'
                    >
                      <i className='fa fa-heart'></i>
                    </button>
                  )}

                  <button
                    className='btn btn-primary'
                    onClick={() => toggleShowComments(!showComments)}
                  >
                    Comments
                  </button>
                </Fragment>
              )}
              {/* {console.log(user === auth.user._id)} */}
            </div>
            <div>
              <span>
                {likes.length > 0 && <span>{likes.length}</span>}
                {likes.length > 0 && ' likes'}
              </span>
            </div>
          </div>
        </div>
        {showComments && (
          <div className='post-comments'>
            <CommentsForm postId={_id} />
            {comments ? (
              comments.map((comment) => (
                <CommentItemArray
                  key={comment._id}
                  comment={comment}
                  postId={_id}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  // addCommentArray: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  // addCommentArray,
})(PostItem);
