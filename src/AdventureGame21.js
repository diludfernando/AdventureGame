// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require("readline-sync");

// Game state variables
let gameRunning = true;
let playerName = "";
let playerHealth = 100;
let playerGold = 20; // Starting gold
let currentLocation = "village";

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Base weapon damage
let monsterDefense = 5; // Monster's defense value
let healingPotionValue = 30; // How much health is restored

// Item templates with properties
const healthPotion = {
    name: "Health Potion",
    type: "potion",
    value: 5, // Cost in gold
    effect: 30, // Healing amount
    description: "Restores 30 health points",
};

const sword = {
    name: "Sword",
    type: "weapon",
    value: 10, // Cost in gold
    effect: 10, // Damage amount
    description: "A sturdy blade for combat",
};

// Shield item templates
const woodenShield = {
    name: "Wooden Shield",
    type: "armor",
    value: 8, // Cost in gold
    effect: 5, // Protection amount
    description: "Reduces damage taken in combat",
};

const ironShield = {
    name: "Iron Shield",
    type: "armor",
    value: 15, // Cost in gold
    effect: 10, // Protection amount
    description: "Better protection than wooden shield",
};

// Advanced weapon template
const steelSword = {
    name: "Steel Sword",
    type: "weapon",
    value: 20, // Cost in gold
    effect: 20, // Damage amount
    description: "A superior blade for experienced warriors",
};

// Create empty inventory array (from previous lab)
let inventory = []; // Will now store item objects instead of strings

// ===========================
// Item Management Helper Functions
// Functions for managing and querying inventory items
// ===========================


function getItemsByType(type) {
    return inventory.filter((item) => item.type === type);
}

/**
 * Finds the item with the highest effect value for a given type
 * @param {string} type The type of item to search for
 * @returns {Object|null} The best item object or null if none found
 */
function getBestItem(type) {
    const items = getItemsByType(type);

    if (items.length === 0) {
        return null;
    }

    // Find item with highest effect value
    let bestItem = items[0];
    for (let i = 1; i < items.length; i++) {
        if (items[i].effect > bestItem.effect) {
            bestItem = items[i];
        }
    }

    return bestItem;
}

/**
 * Checks if player has good enough equipment to face the dragon
 * Requires steel sword (advanced weapon) and any armor
 * @returns {boolean} True if well-equipped, false otherwise
 */
function hasGoodEquipment() {
    // Check for steel sword specifically
    const hasSteelSword = inventory.some(
        (item) => item.name === "Steel Sword"
    );

    // Check for any armor
    const hasArmor = getItemsByType("armor").length > 0;

    return hasSteelSword && hasArmor;
}

// ===========================
// Display Functions
// Functions that show game information to the player
// ===========================

/**
 * Shows the player's current stats
 * Displays health, gold, and current location
 */
function showStatus() {
    console.log("\n=== " + playerName + "'s Status ===");
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);

    // Enhanced inventory display with item details
    console.log("Inventory: ");
    if (inventory.length === 0) {
        console.log("   Nothing in inventory");
    } else {
        inventory.forEach((item, index) => {
            console.log(
                "   " + (index + 1) + ". " + item.name + " - " + item.description
            );
        });
    }
}

/**
 * Shows the current location's description and available choices
 */
function showLocation() {
    console.log("\n=== " + currentLocation.toUpperCase() + " ===");

    if (currentLocation === "village") {
        console.log(
            "You're in a bustling village. The blacksmith and market are nearby."
        );
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Go to market");
        console.log("3: Enter forest");
        console.log("4: Check status");
        console.log("5: Use item");
        console.log("6: Help");
        console.log("7: Quit game");
    } else if (currentLocation === "blacksmith") {
        console.log(
            "The heat from the forge fills the air. Weapons and armor line the walls."
        );
        console.log("\nWhat would you like to do?");
        console.log("1: Buy Sword (" + sword.value + " gold)");
        console.log("2: Buy Steel Sword (" + steelSword.value + " gold)");
        console.log("3: Buy Wooden Shield (" + woodenShield.value + " gold)");
        console.log("4: Buy Iron Shield (" + ironShield.value + " gold)");
        console.log("5: Return to village");
        console.log("6: Check status");
        console.log("7: Use item");
        console.log("8: Help");
        console.log("9: Quit game");
    } else if (currentLocation === "market") {
        console.log(
            "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
        );
        console.log("\nWhat would you like to do?");
        console.log("1: Buy potion (" + healthPotion.value + " gold)");
        console.log("2: Return to village");
        console.log("3: Check status");
        console.log("4: Use item");
        console.log("5: Help");
        console.log("6: Quit game");
    } else if (currentLocation === "forest") {
        console.log(
            "The forest is dark and foreboding. You hear strange noises all around you."
        );
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Use item");
        console.log("4: Help");
        console.log("5: Quit game");
    }
}

// ===========================
// Combat Functions
// Functions that handle battles and health
// ===========================


function hasItemType(type) {
    return inventory.some((item) => item.type === type);
}

/**
 * Handles combat encounters with automatic equipment selection
 * @param {boolean} isDragon Whether this is a dragon boss battle (default: false)
 * @returns {boolean} true if player wins, false if they retreat or lose
 */
function handleCombat(isDragon = false) {
    // Display enemy type
    if (isDragon) {
        console.log("\n=== DRAGON BOSS BATTLE ===");
    } else {
        console.log("\n=== COMBAT ===");
    }

    // Define enemy stats based on battle type
    let enemyName = isDragon ? "Dragon" : "Monster";
    let enemyDamage = isDragon ? 20 : 10;
    let enemyHealth = isDragon ? 50 : 20;

    console.log(enemyName + " appears! [Health: " + enemyHealth + ", Damage: " + enemyDamage + "]");

    // Automatically select best equipment
    let weapon = getBestItem("weapon");
    let armor = getBestItem("armor");

    // Check if player has weapon
    if (!weapon) {
        console.log("\nYou have no weapon to fight with!");
        console.log("You must retreat!");
        updateHealth(-20);
        return false;
    }

    // Display equipped items
    console.log("\nEQUIPMENT CHECK:");
    console.log("Weapon: " + weapon.name + " (Damage: " + weapon.effect + ")");
    if (armor) {
        console.log("Armor: " + armor.name + " (Protection: " + armor.effect + ")");
    } else {
        console.log("Armor: None");
    }

    // Player attacks
    console.log("\n--- YOUR TURN ---");
    console.log("You attack with your " + weapon.name + "!");
    enemyHealth -= weapon.effect;
    console.log("You deal " + weapon.effect + " damage!");
    console.log(enemyName + " health: " + enemyHealth + "/" + (isDragon ? "50" : "20"));

    // Check if enemy is defeated in one hit
    if (enemyHealth <= 0) {
        console.log("\n" + enemyName + " defeated!");
        let goldReward = isDragon ? 100 : 10;
        console.log("You found " + goldReward + " gold!");
        playerGold += goldReward;
        return true;
    }

    // Enemy counter-attacks
    console.log("\n--- ENEMY TURN ---");
    console.log("The " + enemyName + " counter-attacks!");

    // Calculate damage with armor protection
    let damageTaken = enemyDamage;
    let damageBlocked = 0;

    if (armor) {
        damageBlocked = armor.effect;
        damageTaken -= damageBlocked;

        console.log("Your " + armor.name + " blocks " + damageBlocked + " damage!");
    }

    // Ensure minimum damage of 1
    if (damageTaken < 1) {
        damageTaken = 1;
        console.log("The attack barely scratches you!");
    }

    updateHealth(-damageTaken);
    console.log("You take " + damageTaken + " damage!");
    console.log("Your health: " + playerHealth + "/100");

    // Check if player is still alive
    if (playerHealth <= 0) {
        console.log("\nYou have been defeated!");
        return false;
    }

    // Second round of combat
    console.log("\n--- ROUND 2 ---");
    console.log("You strike again with your " + weapon.name + "!");
    enemyHealth -= weapon.effect;
    console.log("You deal " + weapon.effect + " damage!");
    console.log(enemyName + " health: " + enemyHealth + "/" + (isDragon ? "50" : "20"));

    // Check if enemy is defeated
    if (enemyHealth <= 0) {
        console.log("\nVICTORY! " + enemyName + " defeated!");
        let goldReward = isDragon ? 100 : 10;
        console.log("You found " + goldReward + " gold!");
        playerGold += goldReward;

        // Show combat summary
        console.log("\nBATTLE SUMMARY:");
        console.log("Total damage dealt: " + (weapon.effect * 2));
        console.log("Total damage blocked: " + (armor ? damageBlocked : 0));
        console.log("Net damage taken: " + damageTaken);

        return true;
    } else {
        // Enemy still alive, attacks again
        console.log("\nThe " + enemyName + " is still standing!");
        console.log("The " + enemyName + " attacks fiercely!");

        damageTaken = enemyDamage;
        if (armor) {
            damageBlocked = armor.effect;
            damageTaken -= damageBlocked;
            console.log("Your " + armor.name + " blocks " + damageBlocked + " damage!");
        }

        if (damageTaken < 1) damageTaken = 1;

        updateHealth(-damageTaken);
        console.log("You take " + damageTaken + " damage!");
        console.log("Your health: " + playerHealth + "/100");

        if (playerHealth <= 0) {
            console.log("\nYou have been defeated!");
            return false;
        }

        // Final round
        console.log("\n--- FINAL ROUND ---");
        console.log("You unleash a powerful strike!");
        enemyHealth -= weapon.effect;
        console.log("Critical hit! " + weapon.effect + " damage!");

        if (enemyHealth <= 0) {
            console.log("\nVICTORY! " + enemyName + " defeated!");
            let goldReward = isDragon ? 100 : 10;
            console.log("You found " + goldReward + " gold!");
            playerGold += goldReward;
            return true;
        } else {
            console.log("\nThe battle is too difficult!");
            console.log("You retreat to safety!");
            return false;
        }
    }
}

function updateHealth(amount) {
    playerHealth += amount;

    if (playerHealth > 100) {
        playerHealth = 100;
        console.log("You're at full health!");
    }
    if (playerHealth < 0) {
        playerHealth = 0;
        console.log("You're gravely wounded!");
    }

    console.log("Health is now: " + playerHealth);
    return playerHealth;
}

// ===========================
// Item Functions
// Functions that handle item usage and inventory
// ===========================

function useItem() {
    if (inventory.length === 0) {
        console.log("\nYou have no items!");
        return false;
    }

    console.log("\n=== Inventory ===");
    inventory.forEach((item, index) => {
        console.log(index + 1 + ". " + item.name);
    });

    let choice = readline.question("Use which item? (number or 'cancel'): ");
    if (choice === "cancel") return false;

    let index = parseInt(choice) - 1;
    if (index >= 0 && index < inventory.length) {
        let item = inventory[index];

        if (item.type === "potion") {
            console.log("\nYou drink the " + item.name + ".");
            updateHealth(item.effect);
            inventory.splice(index, 1);
            console.log("Health restored to: " + playerHealth);
            return true;
        } else if (item.type === "weapon") {
            console.log("\nYou ready your " + item.name + " for battle.");
            return true;
        }
    } else {
        console.log("\nInvalid item number!");
    }
    return false;
}

/**
 * Displays the player's inventory
 */
function checkInventory() {
    console.log("\n=== INVENTORY ===");
    if (inventory.length === 0) {
        console.log("Your inventory is empty!");
        return;
    }

    // Display all inventory items with numbers and descriptions
    inventory.forEach((item, index) => {
        console.log(index + 1 + ". " + item.name + " - " + item.description);
    });
}

// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

function purchaseItem(item) {
    if (playerGold >= item.value) {
        console.log("\nMerchant: 'A fine choice!'");
        playerGold -= item.value;

        // Add item to inventory
        inventory.push({ ...item });

        console.log("You bought a " + item.name + " for " + item.value + " gold!");
        console.log("Gold remaining: " + playerGold);
    } else {
        console.log("\nMerchant: 'Come back when you have more gold!'");
    }
}

// ===========================
// Help System
// Provides information about available commands
// ===========================

/**
 * Shows all available game commands and how to use them
 */
function showHelp() {
    console.log("\n=== AVAILABLE COMMANDS ===");

    console.log("\nMovement Commands:");
    console.log("- In the village, choose 1-3 to travel to different locations");
    console.log(
        "- In other locations, choose the return option to go back to the village"
    );

    console.log("\nBattle Information:");
    console.log("- You need a weapon to win battles");
    console.log("- Weapons have different damage values");
    console.log("- Monsters appear in the forest");
    console.log("- Without a weapon, you'll lose health when retreating");

    console.log("\nItem Usage:");
    console.log("- Health potions restore health based on their effect value");
    console.log(
        "- You can buy potions at the market for " + healthPotion.value + " gold"
    );
    console.log(
        "- You can buy a sword at the blacksmith for " + sword.value + " gold"
    );

    console.log("\nOther Commands:");
    console.log("- Choose the status option to see your health and gold");
    console.log("- Choose the help option to see this message again");
    console.log("- Choose the quit option to end the game");

    console.log("\nTips:");
    console.log("- Keep healing potions for dangerous areas");
    console.log("- Defeat monsters to earn gold");
    console.log("- Health can't go above 100");
}

// ===========================
// Dragon Encounter
// Final boss encounter
// ===========================


function handleDragonEncounter() {
    console.log("\  A MASSIVE DRAGON emerges from the shadows!");
    console.log("Its scales gleam like molten gold, eyes burning with ancient fury!");

    // Check if player meets equipment requirements
    if (hasGoodEquipment()) {
        console.log("\n You are well-prepared for this battle!");
        console.log("You draw your Steel Sword and ready your shield!");

        // Use the advanced combat system with isDragon=true
        let victory = handleCombat(true);

        if (victory) {
            console.log("\n🎉 LEGENDARY VICTORY!");
            console.log("You have slain the mighty dragon!");
            console.log("\n=== YOU WIN! THE QUEST IS COMPLETE! ===");
            return true;
        } else {
            console.log("\n💀 The dragon was too powerful...");
            return false;
        }
    } else {
        console.log("\n⚠️  You are not prepared for this battle!");

        if (!getBestItem("weapon") || getBestItem("weapon").name !== "Steel Sword") {
            console.log("❌ You need the Steel Sword to defeat the dragon!");
        }

        if (getItemsByType("armor").length === 0) {
            console.log("❌ You need armor to protect yourself from dragon fire!");
        }

        console.log("\n💡 Tip: Equip Steel Sword + any armor, then return!");
        console.log("You wisely retreat before the dragon notices you.");
        return false;
    }
}

// ===========================
// Movement Functions
// Functions that handle player movement
// ===========================

function move(choiceNum) {
    let validMove = false;

    if (currentLocation === "village") {
        if (choiceNum === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        } else if (choiceNum === 2) {
            currentLocation = "market";
            console.log("\nYou enter the market.");
            validMove = true;
        } else if (choiceNum === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest...");
            validMove = true;

            // Trigger combat when entering forest
            console.log("\nA monster appears!");
            if (handleCombat()) {
                // Monster defeated! Offer Dragon challenge
                console.log("\nAs the monster falls, you notice a hidden path leading to a dark cave...");
                console.log("A sign reads: 'BEWARE: DRAGON LAIR'");

                let choice = readline.question("\nDo you want to enter the Dragon's cave? (y/n): ");

                if (choice.toLowerCase() === 'y') {
                    console.log("\nYou step into the gloomy cave...");

                    // Check for Steel Sword (refered to as "iron sword" by user, but item is Steel Sword)
                    let hasSteelSword = inventory.some(item => item.name === "Steel Sword");

                    if (hasSteelSword) {
                        console.log("\nYour Steel Sword glows in the dark!");
                        console.log("You summon the courage to face the beast!");

                        // Fight the Dragon (isDragon = true)
                        if (handleCombat(true)) {
                            console.log("\n******************************************");
                            console.log("*                                        *");
                            console.log("*          LEGENDARY VICTORY!            *");
                            console.log("*    You have slain the Dragon King!     *");
                            console.log("*                                        *");
                            console.log("******************************************");
                            console.log("You return to the village as a hero!");
                            gameRunning = false; // WIN CONDITION
                        } else {
                            if (playerHealth > 0) {
                                console.log("\nYou flee from the dragon, barely escaping with your life!");
                                currentLocation = "village";
                            }
                        }
                    } else {
                        console.log("\nYou see the massive dragon sleeping on a pile of gold.");
                        console.log("You realize your current weapon won't pierce its scales.");
                        console.log("You need a Steel Sword to fight this beast!");
                        console.log("You quietly back away before it wakes up.");
                        currentLocation = "village";
                    }
                } else {
                    console.log("\nYou decide not to push your luck and return to the forest path.");
                }
            } else {
                currentLocation = "village";
            }
        }
    } else if (currentLocation === "blacksmith") {
        if (choiceNum === 2) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    } else if (currentLocation === "market") {
        if (choiceNum === 2) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    } else if (currentLocation === "forest") {
        if (choiceNum === 1) {
            currentLocation = "village";
            console.log("\nYou hurry back to the safety of the village.");
            validMove = true;
        }
    }

    return validMove;
}

// ===========================
// Input Validation
// Functions that validate player input
// ===========================


function isValidChoice(input, max) {
    if (input === "") return false;
    let num = parseInt(input);
    return num >= 1 && num <= max;
}

// ===========================
// Main Game Loop
// Controls the flow of the game
// ===========================

if (require.main === module) {
    console.log("=================================");
    console.log("       The Dragon's Quest        ");
    console.log("=================================");
    console.log("\nYour quest: Defeat the dragon in the mountains!");

    // Get player's name
    playerName = readline.question("\nWhat is your name, brave adventurer? ");
    console.log("\nWelcome, " + playerName + "!");
    console.log("You start with " + playerGold + " gold.");

    while (gameRunning) {
        // Show current location and choices
        showLocation();

        // Get and validate player choice
        let validChoice = false;
        while (!validChoice) {
            try {
                let choice = readline.question("\nEnter choice (number): ");

                // Check for empty input
                if (choice.trim() === "") {
                    throw "Please enter a number!";
                }

                // Convert to number and check if it's a valid number
                let choiceNum = parseInt(choice);
                if (isNaN(choiceNum)) {
                    throw "That's not a number! Please enter a number.";
                }

                // Handle choices based on location
                if (currentLocation === "village") {
                    if (choiceNum < 1 || choiceNum > 7) {
                        throw "Please enter a number between 1 and 7.";
                    }

                    validChoice = true;

                    if (choiceNum <= 3) {
                        move(choiceNum);
                    } else if (choiceNum === 4) {
                        showStatus();
                    } else if (choiceNum === 5) {
                        useItem();
                    } else if (choiceNum === 6) {
                        showHelp();
                    } else if (choiceNum === 7) {
                        gameRunning = false;
                        console.log("\nThanks for playing!");
                    }
                } else if (currentLocation === "blacksmith") {
                    if (choiceNum < 1 || choiceNum > 9) {
                        throw "Please enter a number between 1 and 9.";
                    }

                    validChoice = true;

                    if (choiceNum === 1) {
                        purchaseItem(sword);
                    } else if (choiceNum === 2) {
                        purchaseItem(steelSword);
                    } else if (choiceNum === 3) {
                        purchaseItem(woodenShield);
                    } else if (choiceNum === 4) {
                        purchaseItem(ironShield);
                    } else if (choiceNum === 5) {
                        move(2); // Return to village (mapped to option 2 logic)
                    } else if (choiceNum === 6) {
                        showStatus();
                    } else if (choiceNum === 7) {
                        useItem();
                    } else if (choiceNum === 8) {
                        showHelp();
                    } else if (choiceNum === 9) {
                        gameRunning = false;
                        console.log("\nThanks for playing!");
                    }
                } else if (currentLocation === "market") {
                    if (choiceNum < 1 || choiceNum > 6) {
                        throw "Please enter a number between 1 and 6.";
                    }

                    validChoice = true;

                    if (choiceNum === 1) {
                        purchaseItem(healthPotion);
                    } else if (choiceNum === 2) {
                        move(choiceNum);
                    } else if (choiceNum === 3) {
                        showStatus();
                    } else if (choiceNum === 4) {
                        useItem();
                    } else if (choiceNum === 5) {
                        showHelp();
                    } else if (choiceNum === 6) {
                        gameRunning = false;
                        console.log("\nThanks for playing!");
                    }
                } else if (currentLocation === "forest") {
                    if (choiceNum < 1 || choiceNum > 5) {
                        throw "Please enter a number between 1 and 5.";
                    }

                    validChoice = true;

                    if (choiceNum === 1) {
                        move(choiceNum);
                    } else if (choiceNum === 2) {
                        showStatus();
                    } else if (choiceNum === 3) {
                        useItem();
                    } else if (choiceNum === 4) {
                        showHelp();
                    } else if (choiceNum === 5) {
                        gameRunning = false;
                        console.log("\nThanks for playing!");
                    }
                } else if (currentLocation === "mountain") {
                    if (choiceNum < 1 || choiceNum > 6) {
                        throw "Please enter a number between 1 and 6.";
                    }

                    validChoice = true;

                    if (choiceNum === 1 || choiceNum === 2) {
                        move(choiceNum);
                    } else if (choiceNum === 3) {
                        showStatus();
                    } else if (choiceNum === 4) {
                        useItem();
                    } else if (choiceNum === 5) {
                        showHelp();
                    } else if (choiceNum === 6) {
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
}
