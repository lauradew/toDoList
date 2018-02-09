$(document).ready(function () {
  $('#doForm').on('submit', function (e) {

    // hijack /post request from submit
    e.preventDefault();

    // get the user input from the form
    const taskText = $(this).find('[name="text"]').val();
    const newTask = $("<div>").text(taskText);
    newTask.addClass("toDoItem");

    // todo: wait for server response before appending new task category to the category
    //  todo:
    // todo:


    // if (newTask.length === 0) {
    //   flashMessage("Task may not be empty.");
    // addDo("eat", newTask);
    // $.post("/homepage");

    




    $("#eat").append(newTask);
    
    

  });
});
