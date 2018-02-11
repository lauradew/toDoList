// ------------------------------------
// appendElements.js
// description: inserts new TODO element onsubmit into the corresponding user lists table & displays on page
// TODO: change filename to include all actions performed on document.ready
// ------------------------------------



$(document).ready(function () {

  function flashMessage(message) {
    $("#flash").text(message);
    setTimeout(function() {
      $("#flash").text("");
    }, 4000);
  }
  // TODO: display correct modal on click of button
  $('#doForm').on('submit', function (e) {

    // hijack /post request from submit
    e.preventDefault();


    // get the user input from the form
    const taskText = $(this).find('[name="text"]').val().trim();
    if (taskText.length === 0) {
      flashMessage("Form may not be empty.");
      return;
    }

    // append user input to button text
    const newTask = $('<button type="button" class="btn btn-info btn-lg" id="modal">').text(taskText);
    // const newTask = $('<button>').text(taskText);
    // for styling purposes
    newTask.addClass("toDoItem");

    $.post('/homepage', {category: taskText}).done((response) => {
      console.log("got a response:", JSON.stringify(response));
      const category = response.category;

      // Using  $('#testButton').data('target','#testModal2')
      // you will not modify the data-target attribute but you will
      // store the string "#testModal2" in "target" field

      // use attr to modify VALUE
      newTask.attr('data-target', `#${category}`);
      newTask.attr('data-toggle', 'modal');


      const newModal = $(`<div class="modal fade" role="dialog">`);
      newModal.attr('id', category);
      // newModal.append(newTask);

      // TODO: append user data to new modal to be displayed
      // $(`#${response.category}`).append(newTask);

      window.location.reload("/homepage");

    });

  });


  // shows the modal on click of each category item
  // FIXME: only work on category items - activates on close buttons in the modal as well

  $('body').on('click', '.toDoItem', function(e) {
    $('#myModal').modal("show");

    // first clear the modal body before displaying stuff
    // let modalBody = $('#myModal').find('ul').clear();
    $('#myModal').find('.modal-body li').remove();

    const description = $(this).data('title');
    let links = $(this).data('resource-links').split(',');

    let unorderedList = $('<ul>');
    unorderedList.addClass('list-elements');

    for (let link of links) {
      if (link) {
        let listElement = $('<li>').append(link);
        unorderedList.append(listElement);
      }
    }

    $('#myModal').find('.modal-title').text(description);
    $('#myModal').find('.modal-body').append(unorderedList);

  });

});

// $('#' + result.category).append(result.description);

