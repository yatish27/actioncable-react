class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{uuid}"
    puts "Player #{uuid} has just joined"

    Seek.create(uuid)
  end

  def unsubscribed
    Seek.remove(uuid)
  end

  def make_move(data)
    Game.make_move(uuid, data)
  end    
end
