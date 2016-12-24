/*

The responsibilities of the ubarController include:

    1. Listening to key entries by users on the front-end.
    2. Syncing the frontend with the backend:
        - Updating the barview for the user. 
        - Updating the backend with the new "position".

*/
var ubarController = function(BarView, playerID, socket) {
    
    this.socket = socket;
    this.playerID = playerID;
    this.BarView = BarView;
    this.last_event = null;
    this.last_event_identifier = null;

    /* Listens for socket events from the back-end and
    updates the view according to the emitted socket events.
    */
    this.socketEventListeners = function() {
        
        var BarView = this.BarView;
        this.socket.on('move' + this.playerID, function(position) {
            BarView.moveBarViewPosition(position);
        });

    }

    /* Setting up the key-listen actions for waiting on 
    user interactions on the front end. */
    this.keyListen = function() {
                
        d3.select('body')
        .on('keydown', keyDown)
        .on('keyup', keyUp);

        var controller = this;

        /* When a key is "upped" or lifted from pressing, this portion is fired. */
        function keyUp () {

            controller.socket.emit('keyup', controller.playerID);
            controller.last_event = 'keyup';
            controller.last_event_identifier = d3.event.keyIdentifier;
        
        }

        /* When a key is pressed this portion is fired */
        function keyDown () {

            if (controller.last_event === 'keydown' && controller.last_event_identifier === d3.event.key)
                return;

            switch (d3.event.key) {

                case 'ArrowRight':                   
                    controller.socket.emit('pressRight', controller.playerID);
                    break;

                case 'ArrowLeft':
                    controller.socket.emit('pressLeft', controller.playerID);                    
                    break;

                default:
                    console.error('Key not identified');
            
            }

            controller.last_event = 'keydown';
            controller.last_event_identifier = d3.event.key;
        
        }
        
    }

    return this;        
}

module.exports = ubarController;