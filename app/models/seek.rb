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
    # if he has a opp player tell him to fuck off or add him in the queue again
  end
end