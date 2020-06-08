import React, { useState } from 'react';
import { appConfig } from '../../app.config';
import { isEmail, isHatName } from '../../utils/validations';

/**
 * SignupPage
 *
 * This is the Registration Page of our App, it is accessible at the '/signup' route.
 *
 * In this example we are using the BaaS (Backend as a Service) solution.
 */

function SignupPage() {
  const initUser = {
    username: '',
    email: '',
  };

  const [user, setUser] = useState(initUser);
  const [errorMsg, setErrorMsg] = useState('');

  const errorMessages = {
    usernameNotValid: 'Sorry, this username is not valid',
    emailNotRecognised: 'Sorry, email is not valid',
  };

  const navigateToHatters = () => {
    const redirectUrl = `http://${window.location.host}/authentication`;
    const applicationId = appConfig.applicationId;

    window.location.href = `https://hatters.dataswift.io/services/baas/signup?email=${user.email}&hat_name=${user.username}&application_id=${applicationId}&redirect_uri=${redirectUrl}&lang=en`;
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
    setErrorMsg('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateSignupDetails();
  };

  const validateSignupDetails = () => {
    let errorMsg = '';

    if (!isHatName(user.username)) {
      errorMsg = errorMessages.usernameNotValid;
    } else if (!isEmail(user.email)) {
      errorMsg = errorMessages.emailNotRecognised;
    } else {
      navigateToHatters();
    }

    if (errorMsg) {
      setErrorMsg(errorMsg);
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className={'flex-column-wrapper flex-content-center flex-align-items-center'}>
      <div className={'flex-spacer-small'} />

      <h3>Create Account</h3>
      <div className={'flex-spacer-small'} />

      <input
        className={` ${errorMsg ? 'input-error-field' : null}`}
        name={'username'}
        type={'text'}
        placeholder="Username"
        autoComplete={'username'}
        value={user.username}
        onChange={e => handleChange(e)}
      />
      <input
        className={` ${errorMsg ? 'input-error-field' : null}`}
        name={'email'}
        type={'text'}
        placeholder="Email"
        autoComplete={'email'}
        value={user.email}
        onChange={e => handleChange(e)}
      />
      {errorMsg && <div className={'input-error-label'}>{errorMsg}</div>}

      <div className={'flex-spacer-large'} />

      <button className={'btn btn-accent'} type={'submit'}>
        Next
      </button>

      <div className={'flex-spacer-small'} />
    </form>
  );
}

export default SignupPage;