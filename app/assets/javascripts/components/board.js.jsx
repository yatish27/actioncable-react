class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      tiles:  [
        '-', '-', '-',
        '-', '-', '-',
        '-', '-', '-'
      ],
      msg: 'Waiting for another player to join...'
    }
  }

  componentDidMount() { 
    this.setupSocket() 
  }

  tileClickHandler(position) {
  	this.updateBoard(position, this.state.player);

    App.messages.makeMove({position: position, player: this.state.player});

    this.updateMsg('Waiting for opponent to Play!!')
  }

  setPlayer(player) {
    this.setState({player: player});
  }

  updateBoard(position, player) {
    let tiles = this.state.tiles
    tiles[parseInt(position)] = player

    this.setState({tiles: tiles})  
  }

  updateMsg(msg) {
    this.setState({msg: msg})
  }

  setupSocket() {
    App.messages = App.cable.subscriptions.create('GameChannel', {
      received(data) {
        switch (data.action) {
          case "game_start":
          	console.log('The game has started. You have been assigned a player.')
          	console.log(data)
            this.setPlayer(data.player)
            this.updateMsg(data.msg)
            break;
          case "move":
            console.log("A move from opponent is received.")
            console.log(data)
            this.updateBoard(data.position, data.player)
            this.updateMsg(data.msg)
            break;
        }
      },

      setPlayer: this.setPlayer.bind(this),
      updateBoard: this.updateBoard.bind(this),
      updateMsg: this.updateMsg.bind(this),

      makeMove(data) {
        this.perform('make_move', data);
      }
    });
  }

  render () {
    return (
      <div>
      	<p>	You are player: {this.state.player} </p>

      	<p> {this.state.msg} </p>

        <div id ='game'>
          { this.state.tiles.map(function(tile, index) {
            return (
              <Tile state={tile} key={index} position={index} tileClickHandler={this.tileClickHandler.bind(this)} />
              )
          }, this) }
        </div>
      </div>
    )
  }
}
