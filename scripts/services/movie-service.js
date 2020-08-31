const movieService = (() => {
    function getAllMovies() {
    return backendless.get('data', 'movies', 'backendless')
  }
  
  function getMyMovies() {
    return backendless.get('data', `movies?where=ownerId%20%3D%20%27${sessionStorage.getItem('creator')}%27`)
  } 
  
  function createMovie(data) {
    return backendless.post('data', 'movies', 'backendless', data)
  }

  function getMovieById(id) {
    return backendless.get('data', `movies/${id}`, 'backendless')
  }

  function buyTickets(id, data) {
    return backendless.update('data', `movies/${id}`, 'backendless', data)
  }

  function deleteMovie(id) {
    return backendless.remove('data', `movies/${id}`, 'backendless')
  }

  function editMovie(id, data) {
    return backendless.update('data', `movies/${id}`, 'backendless', data)
  }

  function movieInputIsValid(obj) {
    let genresPattern = /^[A-Za-z ]{1,}$/;

    if (obj.title.length < 6) {
      notifications.showError('The title should be at least 6 characters long.');
      return false;
    } else if (obj.description.length < 10) {
      notifications.showError('The description should be at least 10 characters long.');
      return false;
    } else if (!(obj.imageUrl.startsWith('http://') || obj.imageUrl.startsWith('https://'))) {
      notifications.showError('The image should start with "http://" or "https://".');
      return false;
    } else if (isNaN(obj.tickets)) {
      notifications.showError('The available tickets should be a number');
      return false;
    } else if (!genresPattern.exec(obj.genres)) {
      notifications.showError('The genres must be separated by a single space.');
      return false;
    }
    return true;
  }

  return {
    getAllMovies,
    getMyMovies,
    createMovie,
    getMovieById,
    buyTickets,
    deleteMovie,
    editMovie,
    movieInputIsValid
  }
})()