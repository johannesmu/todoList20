var app = {
    // Application Constructor
    initialize: function() {
        
        //Cordova specific events
        document.addEventListener('deviceready', this.deviceReady.bind(this), false);
        document.addEventListener('pause', this.pauseListener.bind(this), false);
        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        

        $( "#addButton" ).click(this.testMethod);

    },

    openList: function(){
        alert("LIST OPENED");
    },


    testMethod: function(){
        alert("TESTING! :O");
        
    },

    deviceReady: function(){
        //create the file if it does not exist, then read its content. 
        

    },
    
    pauseListener: function(){
        // alert("ON PAUSE");
        // save state here when user switches app
        // 
    },

    resumeListener: function(){
        // Resume the saved state and reload the UI with the saved data
        // alert("ON RESUME");
    },


    
};

app.initialize();