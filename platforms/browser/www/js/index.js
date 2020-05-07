var app = {
    // Application Constructor
    initialize: function() {


        // select the todoList element for the list view
        this.listView = $('#todo-list');
        // handle click events, 
        $(this.listView).click((event) => {

            let action = $(event.target).data('action');
            // if the user clicks on the label element
            if( action == undefined ) {
                action = $(event.target).parents('li').data('action');
            }
            let id = $(event.target).data('id');
            // if the user clicks on the label element
            if( id == undefined ) {
                id = $(event.target).parents('li').data('id');
            }
            if( action == 'status' ) {
                this.changeStatus(id);
                this.renderItems();
            }
            if( action == 'delete' ) {
                this.deleteTodo(id);
                this.renderItems();
            }
        });

        // select the form element with the user input and the add todo button
        this.form = $('#todoForm');

        // the click event when a user clicks the add task button
        this.form.submit( (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const name = data.get('whatTodo');
            // call the function that creates a new task
            this.addTodo(name);
            // empty the input
            event.target.reset();
        });
       
        this.renderItems();
    },

    // array to store all the tasks 
    todoList: [],

    //add task to todoList function. 
    //Create a new task, add it to the array and then render a new list. 
    addTodo: function(itemName){

        // create unique id for item using timestamp
        const itemId = new Date().getTime();
 
        // create the todo item
        // it needs the previously created id, a name and status
        // set status to false because by default a task should not be completed
        const item = { id: itemId, name: itemName, status: false };
 
        // put it in the beginning of the array
        // so that it automatically shows up on top of the list
        this.todoList.unshift(item);
        // render the updated list of tasks
        this.renderItems();
    },

















    //delete a task from the todolist
    deleteTodo: function(itemId){
        // loop though the todoList array
        // until the correct itemId is found
        // splice it out of the array 
        this.todoList.forEach( (item, index ) => {
            if( item.id == itemId ) {
               this.todoList.splice( index, 1 );
            }
        });
    },
    //this function will clear the list of todo's and add them again, to update the user interface
    renderItems: function() {
        // empty the list view
        $(this.listView).empty();
        // loop through all the items in the todoList array
        this.todoList.forEach( (item) => {
            // template for each item
            const ItemView =    
            `<li 
                data-status="${item.status}" 
                data-id="${item.id}" 
                data-action="status">
                <label>${item.name}</label>
             <button type="button" data-id="${item.id}" data-action="delete">
                &times;
            </button>
            </li>`;
            // add it to list view
            $(this.listView).append(ItemView);
        });
        
    },
    //change between true/false to be able to toggle whether a task has been completed or not
    changeStatus: function( itemId ) {
        // loop through the array to find the id and change its status
        this.todoList.forEach( (item) => {
            if( item.id == itemId ) {
                // if item status is true change to false, if false to true
                item.status = (item.status) ? false : true;
            }
        });
    },







    
};

app.initialize();