// const categorize = require('./category');
$(document).ready(function () {

  $('#doForm').on('submit', function (e) {

    // hijack /post request from submit
    e.preventDefault();

    // get the user input from the form
    const taskText = $(this).find('[name="text"]').val();
    // const newTask = $("<div>").text(taskText);
    const newTask = $('<button type="button" class="btn btn-info btn-lg" data-toggle="modal" id="modal" data-target="#myModal">').text(taskText);
    newTask.addClass("toDoItem");

    // fixme: wait for server response before appending new task category to the category

    // todo: categorize the input text using bayes-classifier

    //  todo:

    // todo:

    $.post('/homepage', {category: taskText}).done((response) => {
      console.log("got a response:", JSON.stringify(response));
      // FIXME: need to categorize before appending

      // server side post categorize works but we need to figure out how to refresh the page on 'add task' to show new task on page
      // const cat = categorize(newTask);
      $(`#${response.category}`).append(newTask);

    });



  });
});


// $('#' + result.category).append(result.description);
