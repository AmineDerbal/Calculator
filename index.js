const displayTop = document.querySelector("#display-top");
const displayBottom = document.querySelector("#display-bottom");

displayBottom.value = "0";
displayTop.value = null;

const btns = document.querySelectorAll(".calcualtor-body button");

btns.forEach((button) => {
  button.addEventListener("click", function (e) {
    if (e.target.className == "number") {
      if (displayBottom.value == "0" && displayBottom.value.length == 1) {
        displayBottom.value = e.target.id;
      } else {
        displayBottom.value += e.target.id;
      }
    }
    // coding the buttons function
  });
});
