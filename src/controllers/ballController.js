/*

The responsibilities of the ballController include:

    1. Listening to backend updates to update the ball's velocity
    on the front-end.
    (The general idea now is to make sure that the backend alone
    knows about collisions changes in velocity so it can 'tell'
    the front-end)

*/

var ballController = function(BallView, socket) {
    
    this.BallView = BallView;
    this.socket = socket;

    this.socketEventListeners = function() {

        var ballView = BallView;
        this.socket.on('moveBall', function(position) {
            ballView.moveBallPosition(position);
        });

    }

    return this;
}

module.exports = ballController;