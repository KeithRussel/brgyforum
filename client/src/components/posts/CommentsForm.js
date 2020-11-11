import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommentArray } from '../../actions/post';

const CommentsForm = ({ postId, addCommentArray }) => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addCommentArray(postId, { text });
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

CommentsForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addCommentArray: PropTypes.func.isRequired,
};

export default connect(null, { addCommentArray })(CommentsForm);
