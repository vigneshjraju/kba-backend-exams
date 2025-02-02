const readline = require('readline');

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const array = [];

function displayMenu() {
    console.log("\nExpense Tracker");
    console.log("1. Shopping");
    console.log("2. Hospital");
    console.log("3. Home");
    console.log("4. Travel");
    console.log("5. Others");
    console.log("6. Exit");
    readline1.question("Select an option (1, 2, 3, 4, 5, 6): ", (option) => {
        a(option);
    });
}

function a(option) {
    switch (option) {
        case '1':
            recordExpense("Shopping");
            break;
        case '2':
            recordExpense("Hospital");
            break;
        case '3':
            recordExpense("Home");
            break;
        case '4':
            recordExpense("Travel");
            break;
        case '5':
            askExpenseDetails();
            break;
        case '6':
            console.log("Exiting Expense Tracker. Goodbye!");
            readline1.close();
            break;
        default:
            console.log("Invalid option. Please select a valid option.");
            displayMenu();
    }
}

function recordExpense(type) {
    readline1.question("Enter the amount spent: ", (amount) => {
        readline1.question("Enter the date (YYYY-MM-DD): ", (date) => {
            const expenseDetails = {
                type,
                amount: parseFloat(amount), 
                date,
            };
            array.push(expenseDetails);
            console.log("\nExpense recorded successfully:");
            console.log(expenseDetails);
            console.log("\nUpdated Expense List:", array);
            displayMenu();
        });
    });
}

function askExpenseDetails() {
    readline1.question("Enter the type of expense: ", (Type) => {
        recordExpense(Type);
    });
}


displayMenu();
