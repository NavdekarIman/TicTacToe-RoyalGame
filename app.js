
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [pos1, pos2, pos3] = pattern;
    const pos1Val = boxes[pos1].innerText;
    const pos2Val = boxes[pos2].innerText;
    const pos3Val = boxes[pos3].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const boxClickHandler = (box) => {
  return () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    turnO = !turnO;
    box.disabled = true;
    count++;

    if (count === 9 && !checkWinner()) {
      gameDraw();
    } else {
      checkWinner();
    }
  };
};

boxes.forEach(box => {
  box.addEventListener("click", boxClickHandler(box));
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);