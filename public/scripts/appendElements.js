
$(document).ready(function() {
  $('#doForm').on('submit', function(e) {
    e.preventDefault();
    const taskText = $(this).find('[name="text"]').val();
    const newTask = $("<div>").text(taskText);
    console.log("==========", newTask);
    newTask.addClass("toDoItem")
    // if (newTask.length === 0) {
    //   flashMessage("Task may not be empty.");
     // addDo("eat", newTask);
    // $.post("/homepage");
    $("#eat").append(newTask);


    });
  });
