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
     * @param {* will help to distinguish between expense items } id 
     * @param {* Description of expense item } description 
     * @param {* Budget of expense item } budget 
     */
     var expense = function(id, description, budget) {
        this.id = id
        this.description = description
        this.budget = budget

     }

    /**
     * 
     * @param {* will help to distinguish between income items } id 
     * @param {* Description of income item } description 
     * @param {* Budget of income item } budget 
     */
    var income = function(id, description, budget) {
        this.id = id
        this.description = description
        this.budget = budget

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
            ince: 0
        }
    }

})()















/**
 * The following closure function will read data from UI.
 * Will be used to update UI
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
        inputBtn: '.add-btn'
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
                value: document.querySelector(DOMStrings.inputBudget).value,
            }

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
 * Will be usd to control the flow of the app.
 * Connect the budget and UI controller
 */
var appController = (function(budgetCtrl, UIctrl) {

    /**
     * Will be used to initialize the web app.
     * Control the event listnera and dom elements
     */
    var initFunction = function() {

        /**
         * Getting the btn class DOM strings that was exposed.
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

    }


    /**
     * Below functions will get user, calculate, add and display user budget.
     **************It will help in don't repeat useself rule.**********
     */
    var ctrlAddItem = function() {


        // Get the field input values
        var input = UIController.getInput()

        // Add the item to the budget controller

        // Add the item to the UI 

        // Calculate the budget

        // Display the budget on the UI

    }

    return {
        /**
         * FUnction to start the application
         */
        init: function () {
            console.log('Application has started')
            initFunction()
        }
    }

})(budgetController, UIController)

/**
 * Are only called outside other models or immidieatly inovoked functions
 */
appController.init()