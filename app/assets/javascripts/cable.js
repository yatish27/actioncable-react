// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer();

}).call(this);


App.messages = App.cable.subscriptions.create('LiveChannel', {
    received(data) {
    // This is the callback for all data pushed by Server on LiveChannel
    switch (data.action) {
        case "game_start":
            console.log(data);
            break;
        case "move":
            console.log(data);
            break;
        case "notify":
            console.log(data);
            break;
    }
},

makeMove(data) {
    this.perform('make_move', data);
}
});