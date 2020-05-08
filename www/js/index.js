
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
        this.form = $('#todoForm');
        // the click event when a user clicks the add task button
        // gets the string of text from the input field "whatTodo"
        // and calls the function that creates a new task
        this.form.submit( (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const name = data.get('whatTodo');
            // call the function that creates a new todo list item
            // with the name taken from the whatTodo input
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
 
    // when app starts, load items if existing
    deviceReady: function () {
        //alert("deviceReady");
        this.loadList();
    },
    // when the app is paused, save the list
    pauseListener: function(){
        //alert("paused");
        this.saveList(this.todoList);
    },
    // when the app is resumed, load the lo
    resumeListener: function(){
        alert("resumed");
        this.loadList();
        //this.renderItems();
    },

    // save to local storage
    saveList: function(todoList){
        // cordova-plugin-nativeStorage function
        // need a unique reference string for each variable saved, 
        // in my case "todoList" for variable todoList (which is an array)
        
        NativeStorage.setItem("todoList", todoList, this.setSuccess, this.setError);
    },

    // load from local storage
    loadList: function(){
        // cordova-plugin-nativeStorage function
        // getItem returns an object, so it needs to be assigned to a variable.
        // use the same reference string as when the variable was saved, so that the same
        // variable can be loaded. In my case the array todoList.
        NativeStorage.getItem("todoList", this.getSuccess, this.getError);
    },

    // cordova-plugin-nativeStorage functions 
    setSuccess: function (obj) {
        // console.log(obj.name) is what this function normally looks like
        // but i do this instead to be able to display the content of the array. 
        console.log(obj);
    },
    // logs an error code in the console if something goes wrong with saving
    setError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },

    changeStatus: function( itemId ) {
        // loop through the array to find the id and change its status
        this.todoList.forEach( (item) => {
            if( item.id == itemId ) {
                // if item status is true change to false, if false to true
                item.status = (item.status) ? false : true;
            }
        });
    },

    saveItems: (list) => {
        try {
            if(!window.localStorage) {
                throw('storage not available');
            }
            else {
                localStorage.setItem('data', JSON.stringify(list) )
            }
        }
        catch( err ) {
            console.log(err);
        }
    },
    loadItems: () => {
        try {
            if( !window.localStorage.getItem('data') ) {
                throw('data not found');
            }
            else {
                let list = JSON.parse( localStorage.getItem('data') );
                return list;
            }
        }
        catch( err ) {
            console.log(err);
        }
    },

    // logs the object that has successfully been loaded
    getSuccess: function (obj) {
        console.log(obj);
        
    },
    // logs an error code in the console if something goes wrong with loading
    getError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },


    // not in use yet. 
    // logs a success message in the console when something has been deleted 
    removeSuccess: function () {
        console.log("Removed");
    },
    // logs a success message in the console when something hasn't been deleted as planned
    removeError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    }

    
 };
 
 app.initialize();