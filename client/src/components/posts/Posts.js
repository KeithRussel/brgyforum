import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, loadmorePosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from './PostForm';

const Posts = ({
  getPosts,
  post: { posts, loading, visible },
  loadmorePosts,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const loadMore = (e) => {
    e.preventDefault();
    loadmorePosts();
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='posts'>
        <PostForm />
        {posts.slice(0, visible).map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
        {visible < posts.length && (
          <button
            type='button'
            className='btn btn-light loadmore'
            onClick={loadMore}
          >
            Load more
          </button>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  loadmorePosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, loadmorePosts })(Posts);
