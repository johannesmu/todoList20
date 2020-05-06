var app = {
    // Application Constructor
    initialize: function() {
        
        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        

        $(document).ready(function() {
            $( "#addButton" ).click(this.addTodo);
        });

        $(document).ready(function() {
            $( "#deleteButton" ).click(this.deleteTodo);
        });
        

    },

    deviceReady: function(){
        //create the file if it does not exist, then read its content. 
       
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

        //create new checkbox with the value from input
        var todoTitle = $('#newTodo').val();
        $("#todoList").append('<input type="checkbox" id="todoItem"/> ' + todoTitle + '<br />');
        
        //clear the input field
        $("#newTodo").val("");

    },

    deleteTodo: function(){

        //find all checked checkboxes and delete them


        
        $("#todoItem").on("click", function() {
            $(".checkbox input:checked").parent().remove();
          });      
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