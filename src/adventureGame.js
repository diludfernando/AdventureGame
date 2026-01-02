
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


const readline = require('readline-sync');

let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let CurrentLocation = "Village";
let gameRunning = true;
let inventory = [];
let weaponDamage=0;
let monsterDefense = 5;
let healingPotionsValue = 30;

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// get player name
playerName= readline.question("What is your name, adventurer? ");
    console.log("Welcome," + playerName + "! Your adventure begins now.");
    console.log("You starts with "+playerGold+" gold.");
 


console.log("Weapon Damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

console.log("Monster Defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

console.log("Healing Potions Value: " + healingPotionsValue);
console.log("A potion will restore 30 health!");

   
