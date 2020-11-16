import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrProfile();
  }, [getCurrProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome, {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          <div className='dash-buttons'>
            <Link to='/profile-form' className='btn'>
              <i className='fas fa-user-circle text-primary'></i> Edit Profile
            </Link>
            <Link to={`/profile/${profile.user._id}`} className='btn'>
              <i className='fas fa-user-circle text-primary'></i> My Profile
            </Link>
          </div>
          <small>
            Note: Please proceed to{' '}
            <a href='https://en.gravatar.com/' target='_blank'>
              Gravatar
            </a>{' '}
            to register your avatar picture{' '}
          </small>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Please fill up some fields for your profile</p>
          <small>
            Note: Please proceed to{' '}
            <Link to='https://en.gravatar.com/'>Gravatar</Link> to register your
            avatar picture{' '}
          </small>
          <Link to='/profile-form' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrProfile, deleteAccount })(
  Dashboard
);
