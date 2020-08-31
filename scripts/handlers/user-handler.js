handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/register.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/login.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  let repeatPass = ctx.params.repeatPassword;

  if(!userService.userRegisterValidation(username, password, repeatPass)){
    return;
  }

  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('User registration successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
    ctx.redirect('#/register');
  });
}

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showSuccess('Logout successful.');
    ctx.redirect('#/login');
  })
}

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  if(!userService.userLoginValidation(username, password)){
    return;
  }

  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('Login successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
    ctx.redirect('#/login');
  });
}