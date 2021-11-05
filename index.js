const displayTop = document.querySelector("#display-top");
const displayBottom = document.querySelector("#display-bottom");
const btns = document.querySelectorAll(".calcualtor-body button");
const dot = document.querySelector("#dot");
const number = document.querySelectorAll(".calcualtor-body .number");

let operator = "";
let val1 = "";
let val2 = "";

displayBottom.value = "";
displayTop.value = "";
dot.disabled = false;

btns.forEach((button) => {
  button.addEventListener("click", function (e) {
    let className = e.target.className;
    let id = e.target.id;

    //case class is number
    if (className == "number") {
      let lastChar = displayBottom.value.charAt(displayBottom.value.length - 1);

      if (displayBottom.value == "0" && displayBottom.value.length == 1) {
        displayBottom.value = e.target.id;
      } else if (
        lastChar == "+" ||
        lastChar == "x" ||
        lastChar == "-" ||
        lastChar == "÷"
      ) {
        displayBottom.value = e.target.id;
      } else {
        displayBottom.value += e.target.id;
      }

      // case class is clear
    } else if (className == "clear") {
      displayBottom.value = "";
      displayTop.value = "";
      dot.disabled = false;
      val1 = "";
      val2 = "";
      operator = "";
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
      if (displayBottom.value.charAt(0) != "-") {
        displayBottom.value = "-" + displayBottom.value;
      } else if (displayBottom.value.charAt(0) == "-") {
        displayBottom.value = displayBottom.value.slice(1);
      }
    }

    // case operation
    else if (className == "operator") {
      operation(id);
    }

    //case =
    else if (className == "=") {
      if (displayBottom.value != "" && operator != "" && val1 !== "") {
        val2 = displayBottom.value;
        equal();
      }
    }
  });
});

// case operator + x - ÷
function operation(id) {
  if (val1 == "" && displayBottom.value != "") {
    operator = id;
    val1 = displayBottom.value;
    displayTop.value = val1 + " " + operator;
    dot.disabled = false;

    displayBottom.value = "";
  } else if (val1 !== "" && displayBottom.value != "") {
    val2 = displayBottom.value;
    displayTop.value += " " + val2 + " " + id;
    equal();
    operator = id;
    displayBottom.value += operator;
  }
}

function equal() {
  if (operator == "+") {
    res = addition(val1, val2);
    displayBottom.value = res;
    val1 = res;
    //displayTop.value = val1 + " " + operator + " " + val2;
    emptyValue();

    if (isInteger(res)) {
      dot.disabled = false;
    } else {
      dot.disabled = true;
    }
  } else if (operator == "-") {
    res = substraction(val1, val2);
    displayBottom.value = res;
    displayTop.value = val1 + " " + operator + " " + val2;
    emptyValue();
    if (isInteger(res)) {
      dot.disabled = false;
    } else {
      dot.disabled = true;
    }
  } else if (operator == "x") {
    res = multipication(val1, val2);
    displayBottom.value = res;
    displayTop.value = val1 + " " + operator + " " + val2;
    emptyValue();

    if (isInteger(res)) {
      dot.disabled = false;
    } else {
      dot.disabled = true;
    }
  } else if (operator == "÷") {
    if (val2 != "0") {
      res = division(val1, val2);
      displayBottom.value = res;
      displayTop.value = val1 + " " + operator + " " + val2;
      emptyValue();

      if (isInteger(res)) {
        dot.disabled = false;
      } else {
        dot.disabled = true;
      }
    } else {
      alert("impossibe to divise a number by 0");
      val2 = "";
    }
  }
}

addition = (val1, val2) => parseFloat(val1) + parseFloat(val2);
substraction = (val1, val2) => parseFloat(val1) - parseFloat(val2);
multipication = (val1, val2) => parseFloat(val1) * parseFloat(val2);
division = (val1, val2) => parseFloat(val1) / parseFloat(val2);
isInteger = (res) => (res % 1 == 0 ? true : false);
emptyValue = () => {
  val2 = "";
  operator = "";
};
