// ------------------------------------
// appendElements.js
// description: inserts new TODO element onsubmit into the corresponding user lists table & displays on page
// TODO: change filename to include all actions performed on document.ready
// ------------------------------------



$(document).ready(function () {

  function flashMessage(message) {
    $("#flash").text(message);
    setTimeout(function () {
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

    $.post('/', {
      category: taskText
    }).done((response) => {
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

      window.location.reload("/");

    });

  });


  // shows the modal on click of each category item
  // FIXME: only work on category items - activates on close buttons in the modal as well

  $('body').on('click', '.toDoItem', function (e) {

    $('#myModal').modal("show");

    // first clear the modal body before displaying stuff
    // let modalBody = $('#myModal').find('ul').clear();
    $('#myModal').find('.modal-body li').remove();

    const description = $(this).data('title');
    let links = $(this).data('resource-links').split(',');

    // let unorderedList = $('<ul>');
    // unorderedList.addClass('list-elements');

    // let metadata = [];

    const linkContainer = $('<div>').addClass('modal-content');

    for (let link of links) {
      if (link) {

        $.ajax({
          method: "GET",
          url: `http://api.linkpreview.net/?key=5a8102ca948bda81b8d7fe836ce0099f35285c4960522&q=${link}`
        }).done((meta) => {
          
          const linkPreview = $('<div>').addClass('card');

          const metaTitle = $('<h3>').text(meta.title);
          const metaDescription = $('<p>').text(meta.description);
          const metaImage = $('<img>').addClass('img-thumbnail').attr('src', meta.image);
          metaImage.attr('width', '300').attr('height', '300');
          const metaLink = $('<a>').attr('href', meta.url).text(meta.url);
          

          linkPreview.append(metaTitle, metaDescription, metaImage);
          

          linkContainer.append(linkPreview);

          // let listElement = $('<iframe>');
          // listElement.append(meta);
          // unorderedList.append(listElement);

        });
      
      }
    }

    $('#myModal').find('.modal-body').empty();
    $('#myModal').find('.modal-title').text(description);
    $('#myModal').find('.modal-body').append(linkContainer);

  });

});

// $('#' + result.category).append(result.description);
