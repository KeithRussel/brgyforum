import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, avatar, text, user, likes, comments, date },
  showActions,
}) => (
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
        <button type='button' onClick={(e) => deletePost(_id)}>
          <i className='fa fa-times-circle' aria-hidden='true'></i>
        </button>
      </div>
      <div className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </div>
      <p className='my-1'>{text}</p>
      <div>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              className='btn btn-light'
              type='button'
            >
              <i className='fa fa-thumbs-up'></i>
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              className='btn btn-light'
              type='button'
            >
              <i className='fa fa-thumbs-down'></i>
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
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
