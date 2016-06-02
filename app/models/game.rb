class Game
  def self.start(player1, player2)
    cross, nought = [player1, player2].shuffle

    ActionCable.server.broadcast "player_#{cross}", {action: "game_start", player: "X", msg: "Play your move!!"}
    ActionCable.server.broadcast "player_#{nought}", {action: "game_start", player: "O", msg: "Waiting for opponent to Play!!"}

    REDIS.set("opponent_for:#{cross}", nought)
    REDIS.set("opponent_for:#{nought}", cross)
  end

  def self.make_move(uuid, data)
    # data => {position: 3, player: 'X'} 
    opponent =  REDIS.get("opponent_for:#{uuid}")
    ActionCable.server.broadcast "player_#{opponent}", {action: "move", position: data['position'], player: data['player'], msg: "Play your move!!"}
  end
end
