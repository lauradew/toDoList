$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {

    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).done((resources) => {
      for (item of items) {
        let linkArray = [];
        for (resource of resources) {
          // create a new button for the modal

          // only get the resources for the correct item by id
          if (resource.item_id === item.id) {
            linkArray.push(resource.link);
          }
        }

        const toDoItem = $(`<button type="button" class="btn btn-info btn-lg" id="modal" data-toggle="modal">`).addClass('toDoItem');
        toDoItem.attr('data-title', item.description);
        toDoItem.attr('data-resource-links', linkArray);
        // TODO: create the modal to be toggled by the button
        // const modal = $('<div>').addClass('modal fade').attr('id', `modal${item.id}`).attr('role', 'dialog');
        // toDoItem.attr('data-target', `modal${item.id}`);

        // const modalContent = $('<div>').addClass('modal-content');
        // const modalHeader = $('<div>').addClass('modal-header').text(item.id);


        // const closeHeader = $('<button>').addClass('close');
        // closeHeader.attr('data-dismiss', 'modal' );
        // closeHeader.text('&times;');

            // modalContent.append(closeHeader);
            // modal.append(modalContent);
            // toDoItem.append(modal);


        // modalContent.append(closeHeader);
        // modal.append(modalContent);
        // toDoItem.append(modal);
        toDoItem.text(item.description).appendTo($(`#${item.category}`));
        // console.log(item);

      }
    });
  });
});
