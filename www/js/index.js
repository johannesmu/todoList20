var app = {
    // Application Constructor
    initialize: function() {
        
        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        

        $( "#addButton" ).click(this.testMethod);

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

    openList: function(){
        alert("LIST OPENED");
    },


    testMethod: function(){
        alert("TESTING! :O");
        
    },



    /* 
        
    */

    
};

app.initialize();