$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {
    for(item of items) {
      // create a new button for the modal

      const toDoItem = $(`<button type="button" class="btn btn-info btn-lg" data-toggle="modal">`).addClass('toDoItem');
      toDoItem.attr('data-title', item.description);
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

      toDoItem.text(item.description).appendTo($(`#${item.category}`));
      // console.log(item);
    }
  });
});
