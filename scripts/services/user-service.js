const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

  function saveSession(res) {
    sessionStorage.setItem('username', res['username']);
    sessionStorage.setItem('authtoken', res['user-token']);
    sessionStorage.setItem('creator', res['ownerId']);
  }

  function register(username, password) {
    return backendless.post('users', 'register', 'basic', {
      username,
      password
    })
  }

  function login(username, password) {
    return backendless.post('users', 'login', 'basic', {
      login : username,
      password
    })
  }

  function logout() {
    return backendless.get('users', 'logout', 'backendless');
  }

  function userRegisterValidation(username, password, repeatPass) {

    if (username.length < 3) {
      notifications.showError('The username should be at least 3 characters long.');
      $('#registerUsername').val('');
      return false;
    } else if (password.length < 6) {
      notifications.showError('The password should be at least 6 characters long.');
      $('#registerPassword').val('');
      ctx.params.password = '';
      return false;
    } else if (repeatPass != null && repeatPass !== password) {
      notifications.showError('The repeat password should be equal to the password.');
      $('#registerPassword').val('');
      $('#registerRepeatPassword').val('');
      ctx.params.repeatPass = '';
      return false;
    }

    return true;
  }

  function userLoginValidation(username, password) {

    if (username.length < 3) {
      notifications.showError('The username should be at least 3 characters long.');
      $('#loginUsername').val('');
      return false;
    } else if (password.length < 6) {
      notifications.showError('The password should be at least 6 characters long.');
      $('#loginPassword').val('');
      ctx.params.password = '';
      return false;
    }
    return true;
  }

  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
    userRegisterValidation,
    userLoginValidation
  }
})()