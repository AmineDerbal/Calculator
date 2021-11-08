const displayTop = document.querySelector("#display-top");
const displayBottom = document.querySelector("#display-bottom");
const btns = document.querySelectorAll(".calcualtor-body button");
const dot = document.querySelector("#dot");
const number = document.querySelectorAll(".calcualtor-body .number");

let operator = "";
let val1 = "";
let val2 = "";
//let secondOperator = "";
secondOperator = false;

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
        displayBottom.value = id;
      } /*else if (
        lastChar == "+" ||
        lastChar == "x" ||
        lastChar == "-" ||
        lastChar == "÷"
      ) {
        displayBottom.value = e.target.id;
      } */ else if (secondOperator) {
        secondOperator = false;
        displayTop.value = val1 + " " + operator;
        displayBottom.value = id;
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
      secondOperator = false;
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
        } else if (secondOperator) {
          // val1 = displayBottom.value;
          displayBottom.value = "0.";
          //operator = secondOperator;
          secondOperator = false;
          //displayTop.value += " " + operator;
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
      if (displayBottom.value != "" && operator != "" && val1 != "") {
        val2 = parseFloat(displayBottom.value);
        displayTop.value = val1 + " " + operator + " " + val2;
        equal();
        val1 = parseFloat(displayBottom.value);
        displayBottom.value = "=" + " " + displayBottom.value;
      }
    }
  });
});

// case operator + x - ÷
function operation(id) {
  if (val1 == "" && displayBottom.value != "") {
    operator = id;
    secondOperator = true;
    val1 = parseFloat(displayBottom.value);
    displayTop.value += val1 + " " + operator;
    dot.disabled = false;
    displayBottom.value = "";
  } else if (val1 !== "" && displayBottom.value != "" && operator != "") {
    val2 = parseFloat(displayBottom.value);
    displayTop.value += " " + val2;
    equal();
    secondOperator = true;
    val1 = parseFloat(displayBottom.value);
    operator = id;
    displayTop.value = val1 + " " + operator;
    dot.disabled = false;
  } else if (operator != "") {
    operator = id;

    displayTop.value = displayTop.value.slice(0, -1);
  } else if (val1 != "" && operator == "") {
    operator = id;
    secondOperator = true;
    displayTop.value = val1 + " " + operator;
  }
}

//
function equal() {
  if (operator == "+") {
    result = addition(val1, val2);
    displayBottom.value = result;
    emptyValue();
    dot.disabled = isInteger(result);
  } else if (operator == "-") {
    result = substraction(val1, val2);
    displayBottom.value = result;
    emptyValue();
    dot.disabled = isInteger(result);
  } else if (operator == "x") {
    result = multipication(val1, val2);
    displayBottom.value = result;
    emptyValue();

    dot.disabled = isInteger(result);
  } else if (operator == "÷") {
    if (val2 != "0") {
      result = division(val1, val2);
      displayBottom.value = result;
      emptyValue();

      dot.disabled = isInteger(result);
    } else {
      alert("ERROR : impossibe to divise a number by 0");
      clear();
    }
  }
}

// operation functions
addition = (val1, val2) => val1 + val2;
substraction = (val1, val2) => val1 - val2;
multipication = (val1, val2) => val1 * val2;
division = (val1, val2) => val1 / val2;
isInteger = (res) => (res % 1 == 0 ? false : true);

// function to initialise variables to null
emptyValue = () => {
  val2 = "";
  operator = "";
  val1 = "";
};
