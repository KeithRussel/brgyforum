import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeCommentArray } from '../../actions/post';

const CommentItem = ({
  postId,
  auth,
  comment: { _id, text, name, avatar, user, date },
  removeCommentArray,
}) => {
  return (
    <Fragment>
      <div className='comments'>
        <div className='comment-avatar'>
          <img src={avatar} alt='' />
        </div>
        <div>
          <div className='comment-user'>
            <h5>{name}</h5>
            {!auth.loading && auth.user._id === user ? (
              <button
                type='button'
                onClick={(e) => removeCommentArray(postId, _id)}
              >
                <i className='fa fa-times-circle' aria-hidden='true'></i>
              </button>
            ) : null}
          </div>
          <div className='comment-text'>{text}</div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  removeCommentArray: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { removeCommentArray })(CommentItem);
