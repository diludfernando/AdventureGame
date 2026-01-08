
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
let currentLocation = "village";
let gameRunning = true;
let inventory = [];
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;


// =============================
// Display Functions
// =============================
function displayStats() {
    console.log("Player Name: "+playerName);
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);
}

// =============================
// Inventory Functions
// =============================
function checkInventory() {
   console.log("\n=== INVENTORY ===");
   if (!hasWeapon && !hasPotion && !hasArmor) {
       console.log("Your inventory is empty!");
       return;
   }
   if (hasWeapon) console.log("- Sword");
   if (hasPotion) console.log("- Health Potion");
   if (hasArmor) console.log("- Shield");
}

let weaponDamage=0;
console.log("Weapon Damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

let monsterDefense = 5;
console.log("Monster Defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

let healingPotionsValue = 30;
console.log("Healing Potions Value: " + healingPotionsValue);
console.log("A potion will restore 30 health!");

let trackLocation= currentLocation
let playTimes= true

console.log("Current Location: " + trackLocation);
console.log("Playing First Time: " + playTimes);

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// get player name
playerName= readline.question("What is your name, adventurer? :  ");
    console.log("Welcome, " + playerName + "! Your adventure begins now.");
    console.log("You starts with "+playerGold+" gold.");
    console.log("   ");


// =============================
// Location & Movement Functions
// =============================
function showLocation(){

        console.log("\n=== " + currentLocation.toUpperCase() + " ===");
    
    if (currentLocation === "village") {
        console.log("You're in a bustling village. The blacksmith and market are nearby.");
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Go to market");
        console.log("3: Enter forest");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Quit game");
    } 
    else if (currentLocation === "blacksmith") {
        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    else if (currentLocation === "market") {
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
}


function move(choiceNum){
    let validMove = false;
    if (currentLocation === "village") {
        if (choiceNum === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        }
        else if (choiceNum === 2) {
            currentLocation = "market";
            console.log("\nYou enter the market.");
            validMove = true;
        }
        else if (choiceNum === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest...");
            validMove = true;
        }
    }
    return validMove;
}


// =============================
// Combat Functions
// =============================
function handleCombat(){
    if(hasWeapon){
        console.log("You have a sword! You attack!");
        console.log("Victory! You founf 10 gold!")
        playerGold+=10;
        return true;
    }else {
        console.log("Witohut a weapon, you must retreat!")
        updateHealth(-20);
    }  
}

// =============================
// Utility Functions
// =============================
function updateHealth(amount){
    playerHealth +=amount;
    if (playerHealth > 100){
        playerHealth = 100;
        console.log("You're at full health ");
    }
    if(playerHealth<0){
        playerHealth = 0;
        console.log("You're gravely wounded!");
    }
    console.log("Health is now: "+ playerHealth);
    return playerHealth
}


function showhelp(){
        console.log("\n=== AVAILABLE COMMANDS ===");
    
    console.log("\nMovement Commands:");
    console.log("- In the village, choose 1-3 to travel to different locations");
    console.log("- In other locations, choose the return option to go back to the village");
    
    console.log("\nBattle Information:");
    console.log("- You need a sword to win battles");
    console.log("- Monsters appear in the forest");
    console.log("- Without a weapon, you'll lose health when retreating");
    
    console.log("\nItem Usage:");
    console.log("- Health potions restore 30 health");
    console.log("- You can buy potions at the market for 5 gold");
    console.log("- You can buy a sword at the blacksmith for 10 gold");
    
    console.log("\nOther Commands:");
    console.log("- Choose the status option to see your health and gold");
    console.log("- Choose the help option to see this message again");
    console.log("- Choose the quit option to end the game");
    
    console.log("\nTips:");
    console.log("- Keep healing potions for dangerous areas");
    console.log("- Defeat monsters to earn gold");
    console.log("- Health can't go above 100");


}


// Main game loop
while(gameRunning){
showLocation();
displayStats();

let validChoice = false;

while(!validChoice){

    try {
            let choiceNum = readline.questionInt("\nEnter choice (number): ");
         

            
            // Handle choices based on location
            if (currentLocation === "village") {
                if (choiceNum < 1 || choiceNum > 6) {
                    throw "Please enter a number between 1 and 6.";
                }
                
                validChoice = true;
                
                if (choiceNum <= 3) {
                    if (!move(choiceNum)) {
                        console.log("\nYou can't go there!");
                    }else if(choiceNum===3){
                        console.log("\nA monster appears!");
                       if (!handleCombat()) {
                           currentLocation = "village";


                    }
                }
            }
                else if (choiceNum === 4) {
                    displayStats();
                }
                else if (choiceNum === 5) {
                    checkInventory();
                }
                else if (choiceNum === 6) {
                    gameRunning = false;
                    console.log("\nThanks for playing!");
                }
            }
            else if (currentLocation === "blacksmith" || currentLocation === "market") {
                if (choiceNum < 1 || choiceNum > 4) {
                    throw "Please enter a number between 1 and 4.";
                }
                
                validChoice = true;
                
                if (choiceNum === 1) {
                    if (!move(choiceNum)) {
                        console.log("\nYou can't go there!");
                    }
                }
                else if (choiceNum === 2) {
                    showStatus();
                }
                else if (choiceNum === 3) {
                    checkInventory();
                }
                else if (choiceNum === 4) {
                    gameRunning = false;
                    console.log("\nThanks for playing!");
                }
            }
            
        } catch (error) {
            console.log("\nError: " + error);
            console.log("Please try again!");
        }
    }

    // Check if player died
    if (playerHealth <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }

}





