var app = {
    // Application Constructor
    initialize: function() {
        
        //cordova specific events
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //document.addEventListener('deviceready', this.testMethod.bind(this), false);

        document.addEventListener('pause', this.pauseListener.bind(this), false);

        document.addEventListener('resume', this.resumeListener.bind(this), false); 
        
        //Listen for a click on a list item

        document.getElementsByClassName("todoList").addEventListener('click', this.openList.bind(this));
        //$( "#todo_list" ).click(this.openList).bind(this);
        document.getElementById("addButton").addEventListener('click', this.createDiv.bind(this));

    },

    openList: function(){
        alert("LIST OPENED");
    },


    createDiv: function() {

        var divElement = document.createElement("div");
        divElement.id = "todoList";
        divElement.className = "listItem";
        divElement.innerHTML = "Hello World!";
        document.body.appendChild(divElement);

    },    
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    testMethod: function(){
        alert("TESTING! :O");
        
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


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();