
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
console.log("Weapon Damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

let monsterDefense = 5;
console.log("Monster Defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

let healingPotionsValue = 30;
console.log("Healing Potions Value: " + healingPotionsValue);
console.log("A potion will restore 30 health!");

let trackLocation= "Village";
let playTimes= true

console.log("Current Location: " + trackLocation);
console.log("Playing First Time: " + playTimes);




console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// get player name
playerName= readline.question("What is your name, adventurer? ");
    console.log("Welcome," + playerName + "! Your adventure begins now.");
    console.log("You starts with "+playerGold+" gold.");


if(CurrentLocation === "Village") {
    console.log("You are in a peaceful village.");
    console.log("The blacksmith market is nearby.");
}


console.log("What would you like to go?");
console.log("1. Visit the blacksmith");
console.log("2. Go to the market");
console.log("3. Explore the forest");
console.log("4. Check your stats");
console.log("5. Exit game");
console.log("   ");



let option = 0;
option = readline.questionInt("Enter the number of your choice: ");
console.log("   ");

switch(option) {
    case 1:
        console.log("You visit the blacksmith");
        CurrentLocation = "Blacksmith";
        if(CurrentLocation === "Blacksmith") {
            console.log("Blacksmiths is named Thorin " + playerName + "See the blacksmithshop with weapons and armor.");
            

            console.log("   ");
            console.log("What would you like to do?");
            console.log("1. Return to village");
            console.log("2. Check the status");
            console.log("3. Exit the game");
            console.log("   ");

            let choice = 0;
            choice = readline.questionInt("Please choose an option");
         
            if (choice === 1) {
                console.log("return to village");

        } else if (choice === 2) {
                console.log("check the status");
            }else if (choice === 3) {
                console.log("exit the game");
                gameRunning =false;
            }
        break;}
        
    case 2:
        console.log("You visit the market");
        break;
    case 3:
        console.log("You visit the forest");
        break;
    case 4:
        console.log("You cheacked your stats");
        break;

    case 5:
        console.log("You exit the game. Goodbye!");
        gameRunning = false;
        break;
    default:
        console.log("Invalid option. Please choose again.");
}




   
