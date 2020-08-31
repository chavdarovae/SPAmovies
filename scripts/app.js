const handlers = {}

$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');
    // home page routes
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // user routes
    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    // additional routes

    this.get('#/allMovies', handlers.getAllMovies);
    this.get('#/myMovies', handlers.getMyMovies);
    this.get('#/addMovie', handlers.getAddMovie);
    this.get('#/details/:id', handlers.getDetails);
    this.get('#/buyTickets/:id', handlers.buyTickets);
    this.get('#/delete/:id', handlers.getDeleteMovie);
    this.get('#/edit/:id', handlers.getEditMovie);
    this.get('#/movie/all', handlers.filterMoviesByGenre);

    this.post('#/movie/create', handlers.createMovie);  
    this.post('#/delete/:id', handlers.deleteMovie);
    this.post('#/edit/:id', handlers.editMovie);
      

  });
  app.run('#/home');
});