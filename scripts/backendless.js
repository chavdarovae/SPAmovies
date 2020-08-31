const backendless = (() => {
  const applicationId = 'D5B2B971-C14A-548A-FF57-6688231F8D00';
  const RESTApiKey = '09493139-2050-470E-8BD2-83D7D7097D09';

  function makeAuth(auth) {
    if (auth == 'basic') {
      return {
        'Content-Type': 'application/json'
      }
    } else {
      return {
        'Content-Type': 'application/json',
        'user-token': `${sessionStorage.getItem('authtoken')}`
      }
    }
  }

  function makeRequest(method, collection, endpoint, auth) {
    return {
      url: `https://api.backendless.com/${applicationId}/${RESTApiKey}/${collection}/${endpoint}`,
      method,
      headers: makeAuth(auth)
    }
  }

  function post(collection, endpoint, auth, data) {
    let req = makeRequest('POST', collection, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
  }

  function get(collection, endpoint, auth) {
    let req = makeRequest('GET', collection, endpoint, auth);
    return $.ajax(req);
  }

  function update(collection, endpoint, auth, data) {
    let req = makeRequest('PUT', collection, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
  }

  function remove(collection, endpoint, auth) {
    let req = makeRequest('DELETE', collection, endpoint, auth);
    return $.ajax(req);
  }

  return {
    get,
    post,
    update,
    remove
  }
})()