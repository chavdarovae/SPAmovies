handlers.getAllMovies = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        ctx.movies = await movieService.getAllMovies();
        ctx.movies.sort((a, b) => Number(b.tickets) - Number(a.tickets));
        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            allMoviesCard: '../templates/allMoviesCard.hbs'
        }).then(function () {
            this.partial('templates/cinema.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}

handlers.getMyMovies = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        ctx.movies = await movieService.getMyMovies();
        ctx.movies.sort((a, b) => Number(b.tickets) - Number(a.tickets));
        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            myMoviesCard: '../templates/myMoviesCard.hbs'
        }).then(function () {
            this.partial('templates/myMovies.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}

handlers.getAddMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('templates/addMovie.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.createMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let _id = ctx.params._id;
    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageUrl = ctx.params.imageUrl;
    let tickets = ctx.params.tickets;
    let genres = ctx.params.genres;
    let movieObj = { _id, title, description, imageUrl, genres, tickets };

    if (!movieService.movieInputIsValid(movieObj)) {
        return;
    }

    movieService.createMovie(movieObj).then(function (res) {
        notifications.showSuccess('Movie created successfully.');
        ctx.redirect('#/home')
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.getDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        let currMovie = await movieService.getMovieById(ctx.params.id);
        ctx.objectId = currMovie.objectId;
        ctx.title = currMovie.title;
        ctx.description = currMovie.description;
        ctx.genres = currMovie.genres;
        ctx.imageUrl = currMovie.imageUrl;
        ctx.tickets = currMovie.tickets;
        ctx.isCreatedByCurrUser = currMovie.ownerId === sessionStorage.getItem('creator');

        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/detailsMovie.hbs');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
    } catch (error) {
        console.log(error);
    }
}

handlers.buyTickets = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        let currMovie = await movieService.getMovieById(ctx.params.id);
        if (currMovie.tickets <= 0) {
            notifications.showError(`There are no available tickets!`);
            ctx.redirect('#/allMovies')
            return;
        }
        let _id = currMovie._id;
        let title = currMovie.title;
        let description = currMovie.description;
        let imageUrl = currMovie.imageUrl;
        let genres = currMovie.genres;
        let tickets = Number(currMovie.tickets) - 1;

        let movieObj = { _id, title, description, imageUrl, genres, tickets };

        movieService.buyTickets(ctx.params.id, movieObj).then(function (res) {
            notifications.showSuccess(`Successfully bought ticket for ${title}!`);
            ctx.redirect('#/allMovies')
        }).catch(function (err) {
            console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}

handlers.getDeleteMovie = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        let currMovie = await movieService.getMovieById(ctx.params.id);
        ctx.objectId = currMovie.objectId;
        ctx.title = currMovie.title;
        ctx.description = currMovie.description;
        ctx.genres = currMovie.genres;
        ctx.imageUrl = currMovie.imageUrl;
        ctx.tickets = currMovie.tickets;

        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/deleteMovie.hbs');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
    } catch (error) {
        console.log(error);
    }
}

handlers.deleteMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    console.log(ctx.params.id);

    movieService.deleteMovie(ctx.params.id).then(function (res) {
        notifications.showSuccess('Movie removed successfully!');
        ctx.redirect('#/home')
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getEditMovie = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        let currMovie = await movieService.getMovieById(ctx.params.id);
        ctx.objectId = currMovie.objectId;
        ctx.title = currMovie.title;
        ctx.description = currMovie.description;
        ctx.genres = currMovie.genres;
        ctx.imageUrl = currMovie.imageUrl;
        ctx.tickets = currMovie.tickets;

        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/editMovie.hbs');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
    } catch (error) {
        console.log(error);
    }
}

handlers.editMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let objectId = ctx.params.objectId;
    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageUrl = ctx.params.imageUrl;
    let genres = ctx.params.genres;
    let tickets = ctx.params.tickets;

    let movieObj = { objectId, title, description, imageUrl, genres, tickets };
    if (!movieService.movieInputIsValid(movieObj)) {
        return;
    }

    movieService.editMovie(ctx.params.id, movieObj).then(function (res) {
        console.log(res);
        notifications.showSuccess(`Listing ${title} updated.`);
        ctx.redirect('#/allMovies')
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.filterMoviesByGenre = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    try {
        ctx.movies = await movieService.getAllMovies();
        ctx.movies = ctx.movies.filter(movie => movie.genres.includes(ctx.params.search));
        if (ctx.movies.length === 0) {
            notifications.showError(`No listings with genre: ${ctx.params.search} found.`)
        }
        ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            allMoviesCard: '../templates/allMoviesCard.hbs'
        }).then(function () {
            this.partial('templates/cinema.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}


