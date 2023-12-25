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
  let currentIndex = list.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex],
      list[currentIndex],
    ];
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

function playGame(logList = false) {
  const boxList = createBoxList();
  if (logList) {
    printBoxList(boxList);
  }
  shuffleBoxList(boxList);
  if (logList) {
    printBoxList(boxList);
  }

  for (let i = 0; i < 100; i++) {
    const res = attemptToFindNumber(i, boxList);
    if (!res[0]) {
      return false;
    }
  }
  return true;
}

function calcProdability() {
  let winGames = 0;
  let numberOfGames = 1_000;
  let logList = false;

  if (process.argv.length >= 3) {
    numberOfGames = parseInt(process.argv[2]);
  }

  if (process.argv.length >= 4) {
    logList = process.argv[3] === "true";
  }

  console.log("Number of attempts set to:", numberOfGames, `\n`);

  const printPoint = parseInt(numberOfGames / 10);

  for (let i = 0; i < numberOfGames; i++) {
    const gameRes = playGame(logList);
    if (gameRes) {
      winGames++;
    }
    const round = i + 1;
    if (round % printPoint === 0) {
      console.log("PlayGames attempt done:", round);
    }
  }
  console.log("\nWin rate:", (winGames / numberOfGames) * 100, "%");
}

/**
 * Run
 */

calcProdability();
