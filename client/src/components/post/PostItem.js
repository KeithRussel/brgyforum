import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  singleAddLike,
  singleRemoveLike,
  deletePost,
} from '../../actions/post';

const PostItem = ({
  singleAddLike,
  singleRemoveLike,
  deletePost,
  auth,
  post: { _id, name, avatar, text, user, likes, comments, date },
  showActions,
}) => {
  const history = useHistory();
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
              {!auth.loading && auth.user._id === user ? (
                <button
                  type='button'
                  onClick={(e) => deletePost(_id) && history.push('/posts')}
                >
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
                  {/* {likes ? likes.map((like) => like.user) : null} */}
                  {/* {!auth.loading &&
                  likes.filter((like) => auth.user._id.includes(like.user))
                    ? 'true'
                    : 'false'} */}
                  {!auth.loading &&
                  likes.some(({ user }) => user === auth.user._id) ? (
                    <button
                      onClick={(e) => singleRemoveLike(_id)}
                      className='btn btn-light heart'
                      type='button'
                    >
                      <i className='fa fa-heart heart-red'></i>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => singleAddLike(_id)}
                      className='btn btn-light heart'
                      type='button'
                    >
                      <i className='fa fa-heart'></i>
                    </button>
                  )}
                </Fragment>
              )}
            </div>
            <div>
              <span>
                {likes.length > 0 && <span>{likes.length}</span>}
                {likes.length > 0 && ' likes'}
              </span>
            </div>
          </div>
        </div>
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
  singleAddLike: PropTypes.func.isRequired,
  singleRemoveLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  singleAddLike,
  singleRemoveLike,
  deletePost,
})(PostItem);
