


$(document).ready(function () {

$('#editCatForm').on('submit', function (e) {
    // hijack /post request from submit
    e.preventDefault();
    newCat = $("#editCategory").find(":selected").val();
    description = $(".modal-title").text();
    // console.log(description);
    $.post('/editCategory', {newCategory: newCat, currentDescription: description}).done((response) => {
    })

      window.location.reload("/");
  });

});

    // get the user input from the form
    // if (taskText.length === 0) {
    //   flashMessage("Form may not be empty.");
    //   return;
    // }

    // // append user input to button text
    // const newTask = $('<button type="button" class="btn btn-info btn-lg" id="modal">').text(taskText);
    // // const newTask = $('<button>').text(taskText);
    // // for styling purposes
    // newTask.addClass("toDoItem");

    // $.post('/homepage', {category: taskText}).done((response) => {
    //   console.log("got a response:", JSON.stringify(response));
    //   const category = response.category;
