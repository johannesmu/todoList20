
var app = {
    // Application Constructor
    initialize: function() {

        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 


        
        // select the todoList element for the list view
        this.listView = $('#todo-list');
        // handle click events on the tasks and the delete button
        $(this.listView).click((event) => {
            let action = $(event.target).data('action');
            // if the user clicks on the list item (the task)
            if( action == undefined ) {
                action = $(event.target).parents('li').data('action');
            }
            let id = $(event.target).data('id');
            // if the user clicks on the list item (the task)
            if( id == undefined ) {
                id = $(event.target).parents('li').data('id');
            }
            if( action == 'status' ) {
                // 
                this.changeStatus(id);
                //render the list again in order to update it 
                this.renderItems();
            }
            if( action == 'delete' ) {
                // if the delete button is pressed, call the delete task function 
                // that removes the task from the array
                // with the id of that task
                this.deleteTodo(id);
                // render the list again to remove it from the list as well
                this.renderItems();
            }
        });
        // select the form element, in which the input field 
        // and the add task button exists
        this.form = $('#todo-form');
        // the click event when a user clicks the add task button
        // gets the string of text from the input field "whatTodo"
        // and calls the function that creates a new task
        this.form.submit( (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const name = data.get('whatTodo');
            // call the function that creates a new todo list item
            this.addTodo( name );
            // empty the input field so it's ready for a new task
            event.target.reset();
        })
        this.renderItems();
    },

    // the array that stores the list items in the todo list
    todoList: [],
 
    addTodo: function(itemName){
        // all tasks needs a unique id, timestamps ensures that
        const itemId = new Date().getTime();
        // create the todo item
        // it needs the previously created id, a name and status
        // set status to false because by default a task should not be completed
        const item = { id: itemId, name: itemName, status: false };
        // add it to the array
        // using unshift so it automatically ends up on top of the list when it renders 
        this.todoList.unshift( item );
        // call the renderItems function, which creates the todo list
        this.renderItems();
        this.saveList(this.todoList);
    },
 
    deleteTodo: function( itemId ){
        // loop though the array
        // looking for the item that has the itemId passed in this function
        // splice it out of the array so it disappears from the list. 
        this.todoList.forEach( (item, index ) => {
            if( item.id == itemId ) {
               this.todoList.splice( index, 1 );
            }
        });
    },
 
    changeStatus: function( itemId ) {
        // loop through the array, same principle as deleteTodo
        // looking for the item that was pressed
        // once found, change its status
        this.todoList.forEach( (item) => {
            if( item.id == itemId ) {
                // every click the status is simply changed
                // if an incompleted task is pressed, its changed from false to true
                // vice versa for a completed task that needs to be set to incomplete
                item.status = (item.status) ? false : true;
            }
        });
    },
 
 
    renderItems: function() {
        // start by clearing out the old list 
        $(this.listView).empty();
        // then loop through all items in the array
        // (all the tasks in the list)
        this.todoList.forEach( (item) => {
            // Put the data from each item into a template 
            // also give the delete button the item's id, for the delete function
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
            // add the template that has the data added to it into the list view
            $(this.listView).append(ItemView);
        });
    },
 
    // create a file to save into when app is paused
    deviceReady: function () {
        
    },
    pauseListener: function(){
        // alert("ON PAUSE");
        // save the todo list to file here
    },
    resumeListener: function(){
        // load the todo list to the array here and display it
        // alert("ON RESUME");
    },

    // save to local storage
    saveList: function(todoList){
        // turn each item in the list into a string using JSON stringify
        let i;
        this.todoList.forEach( (item) => {
            NativeStorage.setItem("item no: " + i, item, this.setSuccess, this.setError);
            i++;
            
        });     
    },

    // load from local storage
    loadList: function(){
        // for each item in the list, get them and parse them back into objects

    },
    
 };
 
 app.initialize();