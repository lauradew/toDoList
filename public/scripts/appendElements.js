function saveDo() {
  const task = $("input.text").text();
  addDo("eat", task);

//   $.ajax({
//     type: "POST",
//     url: "/homepage",
//     data: "task",
//     success: function (result) {
//     }
//   });
}

function addDo(category, task) {
  const elm = $("<div>").addClass("item");
  elm.text(task);
  $(`.itemContainer#${category}`).append(elm);
}



// function homepageElements(category) {
//   const eatColumn = $("<div>")
// }

// $(document).ready(function() {
//   $('#doForm form').on('submit'), function(e) {
//     e.preventDefault();
//     const newTask = $(this).find("#do").val();
//     if (newTask.length === 0) {
//       flashMessage("Task may not be empty.");
//       return;
//     } else {
//      function to return category;
//     }
//   }
// });

