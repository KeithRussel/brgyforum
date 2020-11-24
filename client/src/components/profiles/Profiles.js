import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = ({
  getAllProfile,
  profile: { profiles, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-header'>
            <h1 className='large text-primary'>Profiles</h1>
          </div>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllProfile })(Profiles);
