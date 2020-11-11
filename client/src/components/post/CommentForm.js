import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='textComment'
          id=''
          cols='10'
          rows='2'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button className='btn btn-primary' type='submit'>
          Add Comment
        </button>
      </form>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
