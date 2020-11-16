import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { singleAddLike, singleRemoveLike } from '../../actions/post';

const LikesItem = ({
  likes: { user },
  post: { _id },
  auth,
  singleAddLike,
  singleRemoveLike,
}) => {
  return (
    <Fragment>
      {!auth.loading && auth.user._id === user ? (
        <button
          onClick={(e) => singleRemoveLike(_id)}
          className='btn btn-light'
          type='button'
        >
          <i className='fa fa-thumbs-down'></i>
        </button>
      ) : (
        <button
          onClick={(e) => singleAddLike(_id)}
          className='btn btn-light'
          type='button'
        >
          <i className='fa fa-thumbs-up'></i>
        </button>
      )}
    </Fragment>
  );
};

LikesItem.propTypes = {
  post: PropTypes.object.isRequired,
  likes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  singleRemoveLike: PropTypes.func.isRequired,
  singleAddLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { singleAddLike, singleRemoveLike })(
  LikesItem
);
