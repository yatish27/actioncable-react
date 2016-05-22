class LiveChannel < ApplicationCable::Channel
  # def subscribed
  #   stream_from 'traffic'
  #
  #   puts "A user subscribed to me"
  #   online_count = Rails.cache.read('online_count').to_i + 1
  #   Rails.cache.write('online_count', online_count)
  #   ActionCable.server.broadcast 'traffic', { count: online_count }
  # end
  #
  # def unsubscribed
  #   puts "A user closed the browser hence we lost connection"
  #
  #   online_count = Rails.cache.read('online_count').to_i - 1
  #   Rails.cache.write('online_count', online_count)
  #   ActionCable.server.broadcast 'traffic', { count: online_count }
  # end

  # def speak
  #   stream_from 'speak'
  #   # The client data is pushed and this method is called.
  # end
  #
  # def unspeak
  #   stop_all_streams
  # end

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
