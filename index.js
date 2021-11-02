const displayTop = document.querySelector("#display-top");
const displayBottom = document.querySelector("#display-bottom");
const btns = document.querySelectorAll(".calcualtor-body button");
const dot = document.querySelector("#dot");

let operator = "";
let val1 = "";
let val2 = "";

displayBottom.value = "";
displayTop.value = "";
dot.disabled = false;
let negation = false;

btns.forEach((button) => {
  button.addEventListener("click", function (e) {
    let className = e.target.className;
    let id = e.target.id;

    //case class is number
    if (className == "number") {
      if (displayBottom.value == "0" && displayBottom.value.length == 1) {
        displayBottom.value = e.target.id;
      } else {
        displayBottom.value += e.target.id;
      }

      // case class is clear
    } else if (className == "clear") {
      displayBottom.value = "";
      displayTop.value = "";
      dot.disabled = false;
    }

    // case class is delete
    else if (className == "delete") {
      if (displayBottom.value.charAt(displayBottom.value.length - 1) == ".") {
        dot.disabled = false;
      }

      if (displayBottom.value.length == 1) displayBottom.value = "0";
      else {
        displayBottom.value = displayBottom.value.slice(0, -1);
      }
    }

    // case class is dot
    else if (className == ".") {
      if (dot.disabled == false) {
        if (displayBottom.value == "") {
          displayBottom.value = "0.";
          dot.disabled = true;
        } else {
          displayBottom.value += ".";
          dot.disabled = true;
        }
      }
    }

    //case +/-
    else if (className == "+/-") {
      if (negation == false) {
        displayBottom.value = "-" + displayBottom.value;
        negation = true;
      } else if (negation == true && displayBottom.value.charAt(0) == "-") {
        displayBottom.value = displayBottom.value.slice(1);
        negation = false;
      }
    }

    // case operation
    else if (className == "operator") {
      operation(id);
    }

    // coding the buttons function
  });
});

function operation(id) {
  if (val1 == "" && displayBottom.value != "") {
    operator = id;
    val1 = displayBottom.value;
    displayTop.value = val1 + " " + operator;
    dot.disabled = false;
    negation = false;
    displayBottom.value = "";
  } else if (val1 !== "" && displayBottom.value != "") {
    val2 = displayBottom.value;
    equal();
  }
}

function equal() {}
