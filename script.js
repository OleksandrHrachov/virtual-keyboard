const BODY = document.querySelector("body");
const virtualArea = document.createElement("div");
virtualArea.classList.add("virtual-area");
BODY.appendChild(virtualArea);

const textArea = document.createElement("textarea");
textArea.classList.add("textarea");
textArea.setAttribute("rows", "7");
textArea.setAttribute("tabIndex", "0");
virtualArea.appendChild(textArea);

const keyboardRowsValue = [
  [
    { mainValue: "`", secondaryValue: "~" },
    { mainValue: "1", secondaryValue: "!" },
    { mainValue: "2", secondaryValue: "@" },
    { mainValue: "3", secondaryValue: "#" },
    { mainValue: "4", secondaryValue: "$" },
    { mainValue: "5", secondaryValue: "%" },
    { mainValue: "6", secondaryValue: "^" },
    { mainValue: "7", secondaryValue: "&" },
    { mainValue: "8", secondaryValue: "*" },
    { mainValue: "9", secondaryValue: "(" },
    { mainValue: "0", secondaryValue: ")" },
    { mainValue: "-", secondaryValue: "_" },
    { mainValue: "=", secondaryValue: "+" },
    { mainValue: "backspace", secondaryValue: null },
  ],
  [
    { mainValue: "tab", secondaryValue: null },
    { mainValue: "q", secondaryValue: null },
    { mainValue: "w", secondaryValue: null },
    { mainValue: "e", secondaryValue: null },
    { mainValue: "r", secondaryValue: null },
    { mainValue: "t", secondaryValue: null },
    { mainValue: "y", secondaryValue: null },
    { mainValue: "u", secondaryValue: null },
    { mainValue: "i", secondaryValue: null },
    { mainValue: "o", secondaryValue: null },
    { mainValue: "p", secondaryValue: null },
    { mainValue: "[", secondaryValue: "{" },
    { mainValue: "]", secondaryValue: "}" },
    { mainValue: "\\", secondaryValue: "|" },
    { mainValue: "del", secondaryValue: null },
  ],
  [
    { mainValue: "caps lock", secondaryValue: null },
    { mainValue: "a", secondaryValue: null },
    { mainValue: "s", secondaryValue: null },
    { mainValue: "d", secondaryValue: null },
    { mainValue: "f", secondaryValue: null },
    { mainValue: "g", secondaryValue: null },
    { mainValue: "h", secondaryValue: null },
    { mainValue: "j", secondaryValue: null },
    { mainValue: "k", secondaryValue: null },
    { mainValue: "l", secondaryValue: null },
    { mainValue: ";", secondaryValue: ":" },
    { mainValue: "'", secondaryValue: "double_quote" },
    { mainValue: "enter", secondaryValue: null },
  ],
  [
    { mainValue: "shift", secondaryValue: null },
    { mainValue: "\\", secondaryValue: null },
    { mainValue: "z", secondaryValue: null },
    { mainValue: "x", secondaryValue: null },
    { mainValue: "c", secondaryValue: null },
    { mainValue: "v", secondaryValue: null },
    { mainValue: "b", secondaryValue: null },
    { mainValue: "n", secondaryValue: null },
    { mainValue: "m", secondaryValue: null },
    { mainValue: ",", secondaryValue: null },
    { mainValue: ".", secondaryValue: null },
    { mainValue: "/", secondaryValue: null },
    { mainValue: "up", secondaryValue: null },
    { mainValue: "shift", secondaryValue: null },
  ],
  [
    { mainValue: "ctrl", secondaryValue: null },
    { mainValue: "win", secondaryValue: null },
    { mainValue: "alt", secondaryValue: null },
    { mainValue: "space", secondaryValue: null },
    { mainValue: "alt", secondaryValue: null },
    { mainValue: "ctrl", secondaryValue: null },
    { mainValue: "left", secondaryValue: null },
    { mainValue: "down", secondaryValue: null },
    { mainValue: "right", secondaryValue: null },
  ],
];

const addToTextarea = (symbol) => {
  textArea.value += symbol;
};

const biggerBtns = [
  "backspace",
  "tab",
  "del",
  "caps lock",
  "enter",
  "shift",
  "ctrl",
  "space",
];

const serviceBtns = [
  "backspace",
  "tab",
  "del",
  "caps lock",
  "enter",
  "shift",
  "ctrl",
  "space",
  "win",
  "alt",
  "space",
  "up",
  "left",
  "down",
  "right",
];

const createKey = (key, index, arr) => {
  const btn = document.createElement("div");
  btn.classList.add("key");

  if (key.mainValue === "\\") {
    btn.setAttribute("data-key", "backslash");
  } else {
    btn.setAttribute("data-key", key.mainValue);
  }

  if (biggerBtns.includes(key.mainValue)) {
    btn.classList.add("key--big");
  }
  if (key.mainValue === "shift" && index === arr.length - 1) {
    btn.classList.remove("key--big");
  }
  if (key.mainValue === "space") {
    btn.classList.add("key--space");
  }
  if (serviceBtns.includes(key.mainValue)) {
    btn.classList.add("service-btn");
  }

  if (key.mainValue === "up") {
    btn.innerText = String.fromCodePoint(11205);
    btn.classList.add("arrow");
  } else if (key.mainValue === "down") {
    btn.innerText = String.fromCodePoint(11206);
    btn.classList.add("arrow");
  } else if (key.mainValue === "left") {
    btn.innerText = String.fromCodePoint(11207);
    btn.classList.add("arrow");
  } else if (key.mainValue === "right") {
    btn.innerText = String.fromCodePoint(11208);
    btn.classList.add("arrow");
  } else {
    btn.innerText = key.mainValue;
  }

  if (key.secondaryValue) {
    const btnSecondary = document.createElement("div");
    btnSecondary.classList.add("key--secondary");

    if (key.secondaryValue === "double_quote") {
      btnSecondary.setAttribute("data-key", key.secondaryValue);
      btnSecondary.innerText = '"';
    } else {
      btnSecondary.setAttribute("data-key", key.secondaryValue);
      btnSecondary.innerText = key.secondaryValue;
    }

    btn.appendChild(btnSecondary);
  }

  return btn;
};

const createRows = (arr) => {
  const rows = [];

  arr.forEach((row) => {
    const rowWrapper = document.createElement("div");
    rowWrapper.classList.add("row");

    row.forEach((key, index, arr) => {
      const btn = createKey(key, index, arr);
      rowWrapper.appendChild(btn);
    });

    rows.push(rowWrapper);
  });

  return rows;
};

const createKeyboard = (keyboardRows) => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  keyboardRows.forEach((row) => {
    keyboard.appendChild(row);
  });

  return keyboard;
};

const keyboardKeysRows = createRows(keyboardRowsValue);

const keyboard = createKeyboard(keyboardKeysRows);
virtualArea.appendChild(keyboard);

const getDataKey = (key) => {
  switch (key) {
    case "\\":
      return "backslash";
    case " ":
      return "space";
    case "Delete":
      return "del";
    case "CapsLock":
      return "caps lock";
    case "Control":
      return "ctrl";
    case "Meta":
      return "win";
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    case '"':
      return "double_quote";
    default:
      return key.toLowerCase();
  }
};

document.addEventListener("keydown", (e) => {
  let dataKey = getDataKey(e.key);
  const keys = document.querySelectorAll(`[data-key="${dataKey}"]`);

  textArea.focus();

  keys.forEach((btn) => {
    btn.classList.add("active");

    setTimeout(() => {
      btn.classList.remove("active");
    }, 200);
  });
});
