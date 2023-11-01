const BODY = document.querySelector("body");

const keyboardRows = [
  [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace'],
  ['Tab', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 'DEL'],
  ['CapsLock', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 69],
  ['Shift', 92, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 'up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 32, 'Alt', 'Ctrl', 'left', 'down', 'right'],
];

const biggerBtns = [
  "Backspace",
  "Tab",
  "DEL",
  "CapsLock",
  69,
  "Shift",
  "Ctrl",
  'Space',
];

const virtualArea = document.createElement("div");
virtualArea.classList.add("virtual-area");
BODY.appendChild(virtualArea);

const textArea = document.createElement("textarea");
textArea.classList.add("textarea");
textArea.setAttribute("rows", "10");
virtualArea.appendChild(textArea);

const createKey = (key, index, arr) => {
  const btn = document.createElement("div");
  btn.classList.add("key");
  btn.setAttribute('data-key', key);

  if (biggerBtns.includes(key)) {
    btn.classList.add("key--big");
  }
  if (key === "Shift" && index === arr.length - 1) {
    btn.classList.remove("key--big");
  }
  if (key === 32) {
    btn.classList.add("key--space");
  }
  if (typeof key === 'string' || key === 32 || key === 69) {
    btn.classList.add('special-btn');
  }

  if (key === "up") {
    btn.innerText = String.fromCodePoint(11205);
    btn.classList.add('arrow');
  } else if (key === "down") {
    btn.innerText = String.fromCodePoint(11206);
    btn.classList.add('arrow');
  } else if (key === "left") {
    btn.innerText = String.fromCodePoint(11207);
    btn.classList.add('arrow');
  } else if (key === "right") {
    btn.innerText = String.fromCodePoint(11208);
    btn.classList.add('arrow');
  }else if (key === 69) {
    btn.innerText = 'Enter';
  } else if (typeof key === 'string') {
    btn.innerText = key;
  } else {
    btn.innerText = String.fromCharCode(key);
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

const keyboardKeysRows = createRows(keyboardRows);

const keyboard = createKeyboard(keyboardKeysRows);
virtualArea.appendChild(keyboard);

document.addEventListener('keypress', (e) => {
  console.log('charCode =>', e.key.charCodeAt());
  console.log('letter =>', String.fromCharCode(e.key.charCodeAt()));

  const keyCharCode = e.key.charCodeAt();
  const keys = document.querySelectorAll(`[data-key='${keyCharCode}']`);
  console.log('keys =>', keys);

  keys.forEach((btn) => {
    btn.classList.add('active');

    setTimeout(() => {
      btn.classList.remove('active');
    }, 200);
  })
})
