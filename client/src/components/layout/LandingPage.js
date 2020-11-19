import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LandingPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <>
      <div className='bg-image'></div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='wrapper'>
            <h1 className='x-large'>Barangay Forum</h1>
            <p className='lead'>
              Discuss your complaint and suggestion here in our Barangay Forum
              Community
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn'>
                Sign Up
              </Link>
              <Link to='/login' className='btn'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
