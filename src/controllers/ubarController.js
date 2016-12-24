/*

The responsibilities of the ubarController include:

    1. Listening to key entries by users on the front-end.
    2. Syncing the frontend with the backend:
        - Updating the barview for the user. 
        - Updating the backend with the new "position".

*/
var ubarController = function(BarView) {
    
    this.BarView = BarView;
    this.last_event = null;
    this.last_event_identifier = null;
    this.moveInterval = null;

    this.keyListen = function() {
        
        var controller = this;
        
        d3.select('body')
        .on('keydown', keyDown)
        .on('keyup', keyUp);

        /* When a key is "upped" or lifted from pressing, this portion is fired. */
        function keyUp () {
            
            clearInterval(this.moveInterval);
            console.log('Keyup happened');
            controller.last_event = 'keyup';
            controller.last_event_identifier = d3.event.keyIdentifier;

        }

        /* When a key is pressed this portion is fired */
        function keyDown () {

            if (controller.last_event === 'keydown' && controller.last_event_identifier === d3.event.key)
                return;

            switch (d3.event.key) {
                case 'ArrowRight':
                    if(controller.last_event_identifier === 'ArrowLeft')
                        clearInterval(this.moveInterval);

                    this.moveInterval = setInterval(function() {
                        controller.BarView.moveBarView(true);
                    }, 1);
                    //TODO we would emit a socket event here.
                    break;
                case 'ArrowLeft':
                    if(controller.last_event_identifier === 'ArrowRight')
                        clearInterval(this.moveInterval);

                    this.moveInterval = setInterval(function() {
                        controller.BarView.moveBarView(false);
                    }, 1);
                    //TODO we would emit another socket event here. 
                    break;
                default:
                    console.log("Key not identified");
            }

            controller.last_event = 'keydown';
            controller.last_event_identifier = d3.event.key;
        
        }
        
    }

    return this;        
}

module.exports = ubarController;