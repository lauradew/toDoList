$(document).ready(function () {

  $('#deleteForm').on('submit', function (e) {
    // hijack /post request from submit
    e.preventDefault();
    description = $(".modal-title").text();
    $.post('/delete', {
      currentDescription: description
    }).done((response) => {})
    window.location.reload("/");
  });

});
