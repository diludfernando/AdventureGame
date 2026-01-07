
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
let CurrentLocation = "VILLAGE";
let gameRunning = true;
let inventory = [];
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;

function displayStats() {
    console.log("Player Name: "+playerName);
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + CurrentLocation);
   
}

function displayInventory() {
    for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if (slot === 1 && hasWeapon) {
                    console.log("Found: Sword");
                } else if (slot === 2 && hasPotion) {
                    console.log("Found: Health Potion");
                } else if (slot === 3 && hasArmor) {
                    console.log("Found: Shield");
                } else {
                    console.log("Empty slot");
                }
            }
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

let trackLocation= CurrentLocation
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



while (gameRunning === true) {

if(CurrentLocation === "VILLAGE") {
    let firstVisit = true;
console.log("============================================");
console.log("       You are in a peaceful village       ");
console.log("============================================");
    console.log("The blacksmith market is nearby.");



console.log("What would you like to go?");
console.log("   ");
console.log("1. Visit the blacksmith");
console.log("2. Go to the market");
console.log("3. Explore the forest");
console.log("4. Check your stats");
console.log("5. Check your inventory");
console.log("6. Exit game");
console.log("   ");

// get player choice

try{
let option = readline.questionInt("Enter the number of your choice: ");


if(option<1 || option >6){
    throw new Error ("Please enter number between 1 - 6 ");
}


switch(option) {
    case 1:
        console.log("==========================");
        console.log("You visit the Blacksmith");
        console.log("==========================");
        CurrentLocation = "BLACKSMITH";
         console.log("Blacksmiths is named Thorin " + playerName + " See the blacksmithshop with weapons and armor.");
       
           break;
        
    case 2:
        console.log("=====================");
        console.log("You visit the market");
        console.log("=====================");
        CurrentLocation = "MARKET";
        break;
    case 3:
        console.log("=====================");
        console.log("You visit the forest");
        console.log("=====================");
        CurrentLocation = "FOREST";
        break;
    case 4:
        console.log("=======================");
        console.log("You cheacked your stats");
        console.log("=======================");
        displayStats();
        break;

        case 5:
        console.log("=========================");
        console.log("You cheacked your inventory");
        console.log("=========================");
        displayInventory();
        break;
    case 6:
        console.log("===========================");
        console.log("You exit the game. Goodbye!");
        console.log("===========================");
        gameRunning = false;
        break;
    default:
        console.log("Invalid option. Please choose again.");
    }


if (CurrentLocation === "BLACKSMITH") {

     
     console.log("   ");
            console.log("What would you like to do?");
            console.log("1. Return to village");
            console.log("2. Check the status");
            console.log("3. Exit the game");
            console.log("   ");

        let Validechoice = false;

        while(!Validechoice){
            try{


            let choice= readline.questionInt("Please choose an option: ");

                if(choice <1 || choice> 4){
                    throw new Error (" Invalide choise please enter number between 1 - 4 ");

                }
                Validechoice = true;

            if (choice === 1) {
                console.log("return to village");
                firstVisit = false;
                CurrentLocation = "VILLAGE";

        } else if (choice === 2) {
                console.log("check the status");
                displayStats();
                Validechoice = false;
            }else if (choice === 3) {
                console.log("exit the game");
                gameRunning =false;
            }else{
                console.log("Invalid option. Please choose again.");
            }
        }catch(error){
            console.log("erro"+error.message);
        }
    }
      
 }  else if (CurrentLocation === "MARKET") {
    console.log("You are at the market. You can buy supplies here.");
         
     console.log("   ");
            console.log("What would you like to do?");
            console.log("1. Return to village");
            console.log("2. Check the status");
            console.log("3. Exit the game");
            console.log("   ");

            let valideMarketChoice = false;
            while(!valideMarketChoice){
            try {

            let choice= readline.questionInt("Please choose an option: ");

                  if(choice<1 || choice >3){
                    throw new Error ("Inviled choice please choose a number between 1 - 3");
                }
                    valideMarketChoice = true;

            console.log("   ");
            if (choice === 1) {
                console.log("return to village");
                firstVisit = false;
                CurrentLocation = "VILLAGE";

        } else if (choice === 2) {
                console.log("check the status");
                displayStats();
                valideMarketChoice = false;
               
            
            }else if (choice === 3) {
                console.log("exit the game");
                gameRunning =false;
            }

        }catch(error){
            console.log("Error"+ error.message);

        }
    }
        }else if (CurrentLocation === "FOREST") {
            console.log("You are in the forest. Be careful of monsters!");
            

             console.log("A wild Monster appears!");
            let  inbattle = true;
            let monsterHealth = 3;
             while(inbattle === true){
            monsterHealth--;


            if(monsterHealth<=0){
                console.log("You defeated the Monster!");
                inbattle = false;
            }
            
        
             }

             CurrentLocation = "VILLAGE";
             console.log("You return to the village after defeating the monster.");

        }

          // Check if player died
    if (playerHealth <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }
} catch (error) {
    console.log("Error: " + error.message);
}

}
}


      


        

 
          
          

