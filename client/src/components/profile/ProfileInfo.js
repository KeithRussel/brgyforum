import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileInfo = ({
  profile: {
    user: { name, avatar },
    bio,
    location,
    skills,
    social: { twitter, facebook, instagram, linkedin, youtube },
  },
}) => {
  return (
    <Fragment>
      <div className='info'>
        <img src={avatar} alt='profile img' />
        <h3>{name}</h3>
        <p>{location}</p>
        <small>{bio}</small>
        <div className='skills'>
          <h5>Skills:</h5>
          {skills.map((skill, index) => (
            <span key={index}>{(index ? ',' : '') + skill}</span>
          ))}
        </div>
        <div className='social'>
          {twitter !== '' ? (
            <a href={twitter}>
              <i className='fab fa-2x fa-twitter-square' aria-hidden='true'></i>
            </a>
          ) : null}
          {facebook !== '' ? (
            <a href={facebook}>
              <i
                className='fab fa-2x fa-facebook-square'
                aria-hidden='true'
              ></i>
            </a>
          ) : null}
          {instagram !== '' ? (
            <a href={instagram}>
              <i
                className='fab fa-2x fa-instagram-square'
                aria-hidden='true'
              ></i>
            </a>
          ) : null}
          {linkedin !== '' ? (
            <a href={linkedin}>
              <i className='fab fa-2x fa-linkedin' aria-hidden='true'></i>
            </a>
          ) : null}
          {youtube !== '' ? (
            <a href={youtube}>
              <i className='fab fa-2x fa-youtube-square' aria-hidden='true'></i>
            </a>
          ) : null}
        </div>
      </div>
      {/* <div className='activity'>
        <button className='btn btn-light'>About</button>
        <button className='btn btn-light'>Post</button>
      </div> */}
    </Fragment>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileInfo;
