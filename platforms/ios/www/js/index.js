var app = {
    // Application Constructor
    initialize: function() {
        
        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        // select the list view element
        this.listView = $('#listview');
        // handle click
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
        // select the form element
        this.form = $('#todo-form');
        // handle the form submission (when user clicks '+' )
        this.form.submit( (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const name = data.get('todo');
            // call addTodo
            this.addTodo( name );
            // empty the input
            event.target.reset();
        })
        
        //load the data
        this.todoList = this.loadItems();
        this.renderItems();
    },

    deviceReady: function(){
        //create the file if it does not exist, then read its content. 
       
    },
    
    createFile: function() {
        var type = window.TEMPORARY;
        var size = 5*1024*1024;
        window.requestFileSystem(type, size, successCallback, errorCallback)
     
        function successCallback(fs) {
           fs.root.getFile('todo.txt', {create: true, exclusive: true}, function(fileEntry) {
              alert('File created!')
           }, errorCallback);
        }
     
        function errorCallback(error) {
           alert("ERROR: " + error.code)
        }
         
    },
    pauseListener: function(){
        // alert("ON PAUSE");
        // save the todo list to file here
    },

    resumeListener: function(){
        // load the todo list to the array here and display it
        // alert("ON RESUME");
    },

    // store todo items in an array
    todoList: new Array(),

    addTodo: function(itemName){
        // create unique id for item using timestamp
        const itemId = new Date().getTime();
        // create the todo item with id, name, status (false because it is not done)
        const item = { id: itemId, name: itemName, status: false };
        // add it to the array (to the beginning)
        this.todoList.unshift( item );
        this.renderItems();
    },

    deleteTodo: function( itemId ){
        // loop though the array to find the id and delete the item
        this.todoList.forEach( (item, index ) => {
            if( item.id == itemId ) {
               this.todoList.splice( index, 1 );
            }
        });
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
        // save the list
        this.saveItems(this.todoList);
    }

    
};

app.initialize();