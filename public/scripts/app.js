$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((items) => {
    for(item of items) {
      const toDoItem = $('<div>').addClass('toDoItem');
      toDoItem.text(item.description).appendTo($(`#${item.category}`));
      // console.log(item);
    }
  });
});
