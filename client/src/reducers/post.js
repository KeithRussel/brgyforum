import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  SINGLE_POST_UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  ADD_COMMENT_ARRAY,
  REMOVE_COMMENT,
  REMOVE_COMMENT_ARRAY,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        post: null,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], // Return the posts to component with new post
        loading: false,
      };
    case DELETE_POST:
      return {
        posts: state.posts.filter((post) => post._id !== payload), // Return all the post except the post._id matches to payload
        post: null,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: null,
        loading: false,
      };
    case SINGLE_POST_UPDATE_LIKES:
      return {
        ...state,
        posts: [],
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        // posts: { ...state.posts, payload },
        post: { ...state.post, comments: payload },
        // posts: state.posts.map((post) =>
        //   post._id === payload.postId
        //     ? { ...post, comments: payload.comments }
        //     : post
        // ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ), // Return all comment except with the comment._id equal to payload because its already deleted from server so we want to deleted it from state or UI
        },
        loading: false,
      };
    case ADD_COMMENT_ARRAY:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT_ARRAY:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.comments._id !== payload
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== payload
                ),
              }
            : post
        ),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
