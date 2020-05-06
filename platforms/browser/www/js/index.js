var app = {
    // Application Constructor
    initialize: function() {
        
        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        
        
        $( "#addButton" ).click(this.addTodo);
        //$( "#deleteButton").click(this.deleteTodo);

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



    addTodo: function(){
        var todoTitle = $('#newTodo').val();
        
        //Create a div with id todo
        // var todoDiv = document.createElement('div');
        // todoDiv.id = 'task';
        // var todoCheckbox = document.createElement('input');
        // todoCheckbox.type = "checkbox";
        // var todoLabel = document.createElement('label');
        // todoLabel.title = todoTitle;
        // todoDiv.appendChild(todoCheckbox);
        // todoDiv.appendChild(todoLabel);
        //$("#todoList").append(todoDiv);    
        $("#todoList").append('<input type="checkbox" id="todoItem"/> ' + todoTitle + '<br />');
        $("#newTodo").val("");
    },

    deleteTodo: function(){
  
        
    }

    /* 
        $('#addCheckbox').click(function() {
        var text = $('#newCheckText').val();
        $('#checkboxes').append('<input type="checkbox" /> ' + text + '<br />');
        });



        //Get
        var bla = $('#txt_name').val();

        //Set
        $('#txt_name').val(bla);

    */

    
};

app.initialize();