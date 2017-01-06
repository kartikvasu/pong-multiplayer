# Pong Multiplayer
A multiplayer pong game in the browser. I'm not much of a hacker... apologies for what you're about to see.      
My first project with socket.io. A simple pong game between two players that's mostly bouncing a ball around.   
Isn't that what all games are though? 

TODO:  
<ul>
  <li><strike>Implement scaling stuff b/w back-end and front-end.</strike></li>
  <li><strike>Figure out player-opponent distinction stuff at front-end.</strike></li>
  <li><strike>More error checking at the front-end. Could think about throwing exceptions.</strike></li>
  <li>Setup event controllers.
    <ul> 
    <li><strike>Detect key events. </strike></li> 
    <li><strike>Emit socket events from the front-end. </strike></li>
    <li><strike>Detect socket events at the back-end. </strike></li>
    <li><strike>Update the entire game at the back-end.</strike></li>
    <li><strike>Push changes to players at the front-end.</strike></li>
    </ul>
  </li>
<ul>

Update: 1/7/2017
Most of the game mechanics are figured out. At this point, I'm messing around with setting up clients and cleaning out the client management that the server has to do. Code is getting messy, which means more refactoring. We are picking up in terms of size, therefore adding any sort of code is going to take more time. I might have to set up testing in some way to make sure I don't have to manually test everything before pushing. Right now, the focus is to create "new" games and let players select their opponent and then fire off a new game... No frills, just bare-bones. I want to get the whole thing done before January 22 including <a href = "http://www.gabrielgambetta.com/fpm2.html">client-side prediction and server reconcilation</a>.
