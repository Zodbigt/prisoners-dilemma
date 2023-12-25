function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createBoxList() {
  const list = [];

  for (let i = 0; i < 100; i++) {
    list.push(i);
  }
  return list;
}

function printBoxList(list) {
  let toPrint = "";
  for (let i = 0; i < list.length; i++) {
    const value = list[i];

    let indexStr = `${i + 1}`;
    let valueStr = `${value + 1}`;

    if (indexStr.length < 2) {
      indexStr = ` ${indexStr}`;
    }

    if (indexStr.length < 3) {
      indexStr = ` ${indexStr}`;
    }

    if (valueStr.length < 2) {
      valueStr = ` ${valueStr}`;
    }

    if (valueStr.length < 3) {
      valueStr = ` ${valueStr}`;
    }

    toPrint += `[N:${indexStr} | V:${valueStr}] `;
    if ((i + 1) % 10 === 0 && i !== 0) {
      toPrint += "\n";
    }
  }
  console.log(toPrint);
}

function shuffleBoxList(list) {
  for (let i = 0; i < 100; i++) {
    const randomIndex = getRandomInt(100);

    const currentValue = list[i];
    const randomValue = list[randomIndex];

    list[i] = randomValue;
    list[randomIndex] = currentValue;
  }
}

function attemptToFindNumber(startNumber, list) {
  let boxToCheck = startNumber;
  for (let i = 0; i < 50; i++) {
    const value = list[boxToCheck];
    if (value === startNumber) {
      return [true, boxToCheck];
    }
    boxToCheck = value;
  }
  return [false, null];
}

function playGame() {
  const boxList = createBoxList();
  printBoxList(boxList);
  shuffleBoxList(boxList);
  printBoxList(boxList);

  for (let i = 0; i < 100; i++) {
    const res = attemptToFindNumber(i, boxList);
    if (!res[0]) {
      return false;
    }
  }
  return true;
}

/**
 * Game
 */

let winGames = 0;
const numberOfGames = 1000;

for (let i = 0; i < numberOfGames; i++) {
  const gameRes = playGame();
  if (gameRes) {
    winGames++;
  }
  const round = i + 1;
  if (round % 10_000 === 0) {
    console.log("PlayGames attempt done:", round);
  }
}

console.log("Win rate:", (winGames / numberOfGames) * 100, "%");
