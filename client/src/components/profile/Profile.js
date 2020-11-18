import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileInfo from './ProfileInfo';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Profile = ({
  getProfileById,
  auth: { user },
  profile: { profile, loading },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        // <Spinner />
        <>
          <div className='float-right'>
            <Link className='btn btn-light' to='/profiles'>
              Go back
            </Link>
          </div>
          <h3>This user haven't yet set profile.</h3>
        </>
      ) : (
        <>
          <div className='float-right'>
            <Link className='btn btn-light' to='/profiles'>
              Go back
            </Link>
          </div>
          <div className='main-profile'>
            <ProfileInfo profile={profile} />
          </div>
        </>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
