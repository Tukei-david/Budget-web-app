console.log('script working')

/* Displaying the x button */

// document.querySelector('.item').addEventListener('mouseover', function() {
//     document.querySelector('.item-delete').style.display = 'block'
// })

// document.querySelector('.item').addEventListener('mouseout', function() {
//     document.querySelector('.item-delete').style.display = 'none'
// })



















/**
 * The following closure will be used to control and calculate the budget of user
 */
var budgetController = (function() {



    /**
     * Unique way of making income and income have different id numbers
     * This will to distiungish between different income and expense.
     * Choose an object to store data
     * we create function cunstroctus to help in creation of loats of income and expense items.
     * ****** NEW KEYWORD is used to create an empty object or initiliaze a new method.
     */



    /**
     * 
     * @param {* id help to distinguish between expense items } id 
     * @param {* Description of expense item } description 
     * @param {* value of expense item } value 
     */
     var Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value

     }

    /**
     * 
     * @param {* will help to distinguish between income items } id 
     * @param {* Description of income item } description 
     * @param {* value of income item } value 
     */
    var Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value

     }


    /**
     * Will be used to calculate total income and expense
     * @param {* Calculate total depending on the type} type 
     */
    var calculateTotal = function(type) {

        // these will store the sum of income/expense
        var sum = 0

        // Loop through the array and sum it depending on the type
        data.allItems[type].forEach(function(current) {
            sum += current.value
        })
        data.total[type] = sum
    }

    /**
     * Will be used to store all items and its total
     */
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // -1 means it doesn't exist at this point
    }

    return {
        /**
         * Will be used to add expense and incomes item
         */
        addItem: function(type, des, val) {
            var newItem, ID;

            /**
             * Select the last item ID.
             * Checks also if there are items if not the id will be 0
             */
            if(data.allItems[type].length > 0)  {
                /**
                 * Select the last item id and add 1
                 */
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0;
            }

            /**
             * Distinguish if the item is expense or income
             */
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            }else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            /**
             * Adding new item to data array for storing
             */
            data.allItems[type].push(newItem)

            /**
             * Returning the new item with its properties
             */
            return newItem
        },

        /**
         * Used to calculate toal income and expense
         * Calaculate the percetage of income depending on the expense
         */
        calculateBudget: function() {

            // Calculate the sum of income and expense
            calculateTotal('exp')
            calculateTotal('inc')

            // Calculate the total budget (income -expense)
            data.budget = data.total.inc - data.total.exp

            // Calculate percentage of income
            // Fixing problems of division by 0
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) *  100)
            } else {
                data.percentage = -1
            }
        },

        /**
         * Will handle deletion of expense and income items.
         */
        deleteItem: function(type, id) {
            var index, ids

            /**
             * Loop through a new created array.
             * This will help to find the the index of an id targeted.
             * Map returns a brand new array
             */
            ids = data.allItems[type].map(function(current) {
                return current.id
            })

            // This will get the index number of an item in array
            // Index will be -1 incase the item id is not found in the array.
            index = ids.indexOf(id)

            if(index !== -1) {
                // splice method will remove item on the index number.
                // 1 argument means removing one item only in the array.
                data.allItems[type].splice(index, 1)
            }

        },
        /**
         * Will return the toal budget
         */
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        },
        testing: function() {
            console.log(data)
        }
    }

})()















/**
 * The following closure function will read data from UI.
 * Will be used to update UI
 * Display data in UI
 */
var UIController = (function() {


    /**
     * Will be used to store DOM strings from UI.
     * Will help for better struture of code.
     * Below object will not be accesible outside of this module until returned.
     */
    var DOMStrings = {
        inputType: '.add-type',
        inputDescription: '.add-description',
        inputBudget: '.add-budget',
        inputBtn: '.add-btn',
        incomeList: '.inc-list',
        expenseList: '.exp-list',
        totalBudget: '.total-budget',
        totalExp: '.expense-budget',
        totalInc: '.income-budget',
        expPercent: '.expense-percentage',
        eventDelegation: 'section'
    }

    /**
     * will return an object which will then be accesed in appcontroller module.
     * Returning objects is better becouse you will directly call it as methods in other modules.
     */
    return {

        /**
         * This will read data from the user interface
         */
        getInput: function() {

            // Return object eith three properties instead of creating three variables.
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                // Will change value which was a string to float number with decimals
                value: parseFloat(document.querySelector(DOMStrings.inputBudget).value)
            }

        },

        /**
         * Add item list in th UI
        */
        addListItem: function (obj, type) {

            var html, newHTML, element;
            // Create HTML string eith placeholder test

            if (type === 'inc') {
                // Select the container for income list
                element = DOMStrings.incomeList

                // ELement to be stored
                html = '<div class="item" id="inc-%id%"> <p class="item-list">%description%</p><button class="item-delete">x</button><p class="item-budget">+ %value%</p></div>'
            }else if (type === 'exp') {
                // Select the container for expense list
                element = DOMStrings.expenseList

                // ELement to be stored
                html = '<div class="item" id="exp-%id%"><p class="item-list">%description%</p><button class="item-delete">x</button><p class="item-percentage">- 30%</p><p class="item-budget">- %value%</p></div>'
            }
           
            // Replace the placeholder text with actual data from new items created
            newHTML = html.replace('%id%', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', obj.value)

            // Insert HTML into the DOM element
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)


        },

        /**
         * Used to clear the fields when values are already taken
        */
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputBudget)

            // Call method will trick slice it to thinking the value is is an array
            fieldsArr = Array.prototype.slice.call(fields)

            // Looping through an array of fields
            fieldsArr.forEach(function(current, index, array) {
                current.value = ''
            })

            // Outting the focus to the input field
            fieldsArr[0].focus()
        },

        /**
         * Used to display the budget to the UI
         */
        displayBudget: function(obj) {

            document.querySelector(DOMStrings.totalBudget).textContent = obj.budget
            document.querySelector(DOMStrings.totalInc).textContent ='+ ' + obj.totalInc
            document.querySelector(DOMStrings.totalExp).textContent = '- ' + obj.totalExp

            /**
             * Check if percentage is greater than zero
             */
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.expPercent).textContent = obj.percentage + '%'
            } else {
                document.querySelector(DOMStrings.expPercent).textContent = '---'
            }

        },

        /**
         * Delete expense and income item in UI
         */
        deleteListItem: function(selectorID) {

            /**
             * In Javascript you allowed to only delete the child element
             * We will select the parent element of the item list.
             * Then remove the child element with the id specified.
             */

            // Select the child element
            var child = document.getElementById(selectorID);

            // Select the parent element
            var list = child.parentNode;
            
            // Delete the child element.
            list.removeChild(child);
        },
        /**
         * Exposing the DOMstrings outside other modules.
        */
        getDOMStrings: function() {
            return DOMStrings
        }
    }

})()













/**
 * Will be used to control the flow of the app.
 * Connect the budget and UI controller
 */
var appController = (function(budgetCtrl, UIctrl) {

    /**
     * Will be used to initialize the web app.
     * Control the event listnera and dom elements
     */
    var initFunction = function() {

        /**
         * Getting the button class DOM strings that was exposed.
         */
        var DOM = UIController.getDOMStrings()

        /**
         * retrieve values when clicked
         */
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        /**
         * When Enter key is pressed only
         */

        document.addEventListener('keypress', function (event) {
            /**
             * keyCode is mostly used in modern browsers
             * Which is used in old browsers and also is supported in browsers that dont support keyCode
             */
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })

        /**
         * Select the parent element of expense and income items.
         * This will help in event delegation.
         */
        document.querySelector(DOM.eventDelegation).addEventListener('click', ctrlDeleteItem)

    }

    /**
     * Used to update budget and calculate
     */
    var updateBudget = function() {

        // Calculate the budget
        budgetController.calculateBudget()

        // Return the budget
        var budget = budgetController.getBudget()

        // Display the budget on the UI
        UIController.displayBudget(budget)
    }


    /**
     * Below functions will get user, calculate, add and display user budget.
     **************It will help in don't repeat useself rule.**********
     */
    var ctrlAddItem = function() {
        var input, newItem;

        // Get the field input values
        input = UIController.getInput()


        /**
         * Changes will happen if there are values on the input field
         * Checks also if a number is not a number.
         * Make sure also input value should be greater than zero.
         */
        if (input.description !== '' && !isNaN(input.value) && input.value > 0 ) {
            
            // Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value)
            
            // Add the item to the UI 
            UIController.addListItem(newItem, input.type)

            // Clear the fields
            UIController.clearFields()

            // Calculate and update budget
            updateBudget()  

        }
       

    }

    /**
     * Used to delete expense and income items when clicked
     * Used to update the budget and items total
     */
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.id
        console.log(itemID)
        /**
         * Help to work only if there is an ID in parent element
         */
        if (itemID) {
             
            // We use split method to split the string (item id from its actual ID)
            splitID = itemID.split('-')
            type = splitID[0]
            // This will be string so it needs to be changed into an interger
            ID = parseInt(splitID[1])

            // delete an item from data structure
            budgetController.deleteItem(type, ID)

            // delete an item from UI.
            UIController.deleteListItem(itemID)

            // update and show new budget.
            updateBudget()
        }

    }

    return {
        /**
         * FUnction to start the application
         */
        init: function () {
            console.log('Application has started')   
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            initFunction()
        }
    }

})(budgetController, UIController)

/**
 * Are only called outside other models or immidieatly inovoked functions
 */
appController.init()