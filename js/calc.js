const display = document.getElementById("calc_panel");

function append(char) {
  display.value += char;
}
function calcc() {
  try {
    const safeExpression = display.value.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
    display.value = eval(safeExpression);
  } catch {
    display.value = "Err";
  }
}

function sqrt() {
  display.value = Math.sqrt(eval(display.value))
}

function delLast() {
  display.value = display.value.slice(0, -1);
}

function erase() {
  display.value = "";
}

function switchMinus() {
  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1);
  } else if (display.value !== '') {
    display.value = `-${display.value}`;
  }
}