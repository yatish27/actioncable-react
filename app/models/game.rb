class Game
  def self.start(player1, player2)
    cross, nought = [player1, player2].shuffle

    ActionCable.server.broadcast "player_#{cross}", {action: "game_start", player_type: "cross"}
    ActionCable.server.broadcast "player_#{nought}", {action: "game_start", player_type: "nought"}

    ActionCable.server.broadcast "player_#{cross}", {action: "notify", msg: "Play your move!!"}
    ActionCable.server.broadcast "player_#{nought}", {action: "notify", msg: "Waiting for opponent to Play!!"}

    REDIS.set("opponent_for:#{cross}", nought)
    REDIS.set("opponent_for:#{nought}", cross)
  end

  def self.make_move(uuid, data)
    opponent =  REDIS.get("opponent_for:#{uuid}")
    ActionCable.server.broadcast "player_#{opponent}", {action: "move", move: data['move']}

    ActionCable.server.broadcast "player_#{opponent}", {action: "notify", msg: "Play your move!!"}
    ActionCable.server.broadcast "player_#{uuid}", {action: "notify", msg: "Waiting for opponent to Play!!"}
  end
end