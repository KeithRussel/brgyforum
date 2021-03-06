import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    bio,
    skills,
  },
}) => {
  return (
    <>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>
            <Link to={`/profile/${_id}`}>{name}</Link>
          </h2>
          <p>{location}</p>
          <p>{bio}</p>
          {/* <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className='text-primary'>
                <i className='fas fa-check'> {skill}</i>
              </li>
            ))}
          </ul> */}
        </div>
        {/* <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link> */}
      </div>
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
