const notifications = (() => {
  $(document).on({
    ajaxStart: () => $('#loadingBox').fadeIn(),
    ajaxStop: () => $('#loadingBox').fadeOut()
  })

  function showSuccess(message) {
    let successBox = $('#infoBox');
    let span = $('#infoBox span');
    
    span.text(message);
    successBox.fadeIn();
    successBox.fadeOut(3000);
  }

  function showError(message) {
    let errorBox = $('#errorBox');
    let span = $('#errorBox span');

    span.text(message);
    errorBox.fadeIn();
    errorBox.fadeOut(3000);
  }

  return {
    showSuccess,
    showError
  }
})()