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
    // This is called when the client subscribes to the Ac server/channel
    // The #subscribed method on the server side is called.
  	$('#online').text(data.count);
  },

  speak() {
    // When this method is called, the speak method on the channel is called.
    this.perform('speak')
  }
});