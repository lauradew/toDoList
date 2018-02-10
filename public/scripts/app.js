$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {
    for(item of items) {
      const toDoItem = $('<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="myModal">').addClass('toDoItem');
      toDoItem.text(item.description).appendTo($(`#${item.category}`));
      // console.log(item);
    }
  });
});
