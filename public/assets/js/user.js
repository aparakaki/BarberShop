$(document).on("click", "#menu-toggle", function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

$.get("/setLocalStorage", function (data) {
  console.log(data.id);
  console.log("hit");
  localStorage.clear();
  localStorage.setItem("userId", data.id);
});
