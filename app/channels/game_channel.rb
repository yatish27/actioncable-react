class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from "player_#{uuid}"
    puts "Player #{uuid} has just joined"

    Seek.create(uuid)
  end

  def unsubscribed
    Seek.remove(uuid)
    # TODO update redis with other player
  end

  def make_move(data)
    Game.make_move(uuid, data)
  end
    
end
