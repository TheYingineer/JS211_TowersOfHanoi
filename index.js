// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)

  //if current is no stone, pick up stone, else drop stone
  if(!stone){ 
    return pickUpStone(row.id)
    }

  //if the row's last stone color is not the same as the current color, drop the stone
  if(!row.lastElementChild&&stone){
    dropStone(row.id);
    checkForWin();
    return;
  }

  //Another method to check only apply in the HTML "is it Legal?"
  //comparing the id number by index.html
  //if the id number is bigger than the other, drop the stone
  if(row.lastElementChild.getAttribute("id")>stone.getAttribute("id")){
    console.log(row.lastElementChild.getAttribute("id"), "is greater than", stone.getAttribute("id"))
    dropStone(row.id);
    checkForWin();
    return;
  }
}

const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  stone = selectedRow.removeChild(selectedRow.lastElementChild);
  console.log(stone)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID) => {
  document.getElementById(rowID).appendChild(stone)
  stone = null // <== this line basically saying reset the stone value to null/0
}

//childElementCount is counting how many divs under the id "top-row" or "middle-row"
//if either "top-row" or "middle-row" has all 4 elementcount, then they win. 
const checkForWin =() => {
  if(document.getElementById("top-row").childElementCount === 4 || document.getElementById("middle-row").childElementCount === 4) {
  console.log("You Win!")
  }
}
// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

