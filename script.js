const price = 19.5; // Set the price of the item
const cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

document.getElementById("purchase-btn").addEventListener("click", function () {
  const cashInput = parseFloat(document.getElementById("cash").value.trim());
  const changeDueElement = document.getElementById("change-due");

  if (isNaN(cashInput)) {
    alert("Please provide a valid cash amount.");
    return;
  }

  if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashInput === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let change = cashInput - price;
  const changeArr = [];
  let status = "OPEN";

  // Helper function to calculate change
  for (let i = cid.length - 1; i >= 0; i--) {
    let coinName = cid[i][0];
    let coinValue = getCoinValue(coinName);
    let coinAvailable = cid[i][1];
    let coinToReturn = 0;

    while (change >= coinValue && coinAvailable > 0) {
      change -= coinValue;
      change = Math.round(change * 100) / 100;
      coinAvailable -= coinValue;
      coinToReturn += coinValue;
    }

    if (coinToReturn > 0) {
      changeArr.push(`${coinName}: $${coinToReturn.toFixed(2)}`);
    }
  }

  // Calculate total cash in drawer
  const totalCid = cid.reduce((sum, coin) => sum + coin[1], 0);

  // Check if the cash register should be CLOSED
  if (totalCid === cashInput - price) {
    status = "CLOSED";
    changeArr.length = 0;
    for (const [coinName, coinAmount] of cid) {
      if (coinAmount > 0) {
        changeArr.push(`${coinName}: $${coinAmount.toFixed(2)}`);
      }
    }
  }

  // Check for insufficient funds
  if (change > 0) {
    status = "INSUFFICIENT_FUNDS";
    changeArr.length = 0;
  }

  // Display the results
  changeDueElement.textContent =
    `Status: ${status} ` + (changeArr.length ? changeArr.join(" ") : "");
});

function getCoinValue(coinName) {
  switch (coinName) {
    case "PENNY":
      return 0.01;
    case "NICKEL":
      return 0.05;
    case "DIME":
      return 0.1;
    case "QUARTER":
      return 0.25;
    case "ONE":
      return 1;
    case "FIVE":
      return 5;
    case "TEN":
      return 10;
    case "TWENTY":
      return 20;
    case "ONE HUNDRED":
      return 100;
    default:
      return 0;
  }
}