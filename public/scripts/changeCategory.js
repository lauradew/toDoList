


$(document).ready(function () {

$('#editCategory').on('submit', function (e) {

    console.log("test", e);
    // hijack /post request from submit
    e.preventDefault();


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
