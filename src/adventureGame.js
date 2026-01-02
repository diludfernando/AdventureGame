const readline = require('readline');
/*
Adventure Game
This game will be a text-based adventure game where the player will be able
tomake choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions
*/


// Display the game titie
console.log("Welcome to the Adventure Game!")

//Add a welcome message
console.log("Prepare yourself for an epic journey!");

// Get plauer name using readline-sync
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



let playerHealth = 100;
let playerGold = 20;
let CurrentLocation = "Village";
let gameRunning = true;
let inventory = [];

//create variable for plater satats
function displayStats() {
    console.log(`Health: ${playerHealth}`);
    console.log(`Gold: ${playerGold}`);
    console.log(`Location: ${CurrentLocation}`);
    console.log(`Inventory: ${inventory.join(", ") || "Empty"}`);
}

rl.question("What is your name, adventurer? ", (name) => {
    console.log(`Welcome, ${name}! Your adventure begins now.`);
    console.log("Starting gold: 20");
  rl.close();
   
});
