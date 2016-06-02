class Seek
  def self.create(uuid)
    opponent = REDIS.spop('players')
    if opponent
      Game.start(uuid, opponent)
    else
      REDIS.sadd('players', uuid)
    end
  end

  def self.remove(uuid)
    REDIS.srem('players', uuid)
  end
end