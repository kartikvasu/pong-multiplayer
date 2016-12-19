var ubarController = function(BarView) {
    
    this.BarView = BarView;
    this.last_event = null;
    this.last_event_identifier = null;

    this.keyListen = function() {
        
        var controller = this;
        
        d3.select('body')
        .on('keydown', keyDown)
        .on('keyup', keyUp);

        /* When a key is "upped" or lifted from pressing, this portion is fired. */
        function keyUp () {
            
            console.log('Keyup happened');
            controller.last_event = 'keyup';
            controller.last_event_identifier = d3.event.keyIdentifier;

        }

        /* When a key is pressed this portion is fired */
        function keyDown () {
            if (controller.last_event === 'keydown' && controller.last_event_identifier === d3.event.keyIdentifier)
                return;

            switch (d3.event.keyIdentifier) {
                case 'Right':
                    console.log('The right key was clicked');
                    controller.BarView.moveBarView(true);

                    //TODO we would emit a socket event here.
                    break;
                case 'Left':
                    console.log('The left key was clicked');
                    controller.BarView.moveBarView(false);

                    //TODO we would emit another socket event here. 
                    break;
                default:
                    console.log("Key not identified");
            }

            controller.last_event = 'keydown';
            controller.last_event_identifier = d3.event.keyIdentifier;
        }
        
    }

    return this;        
}

module.exports = ubarController;