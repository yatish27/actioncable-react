class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      tiles:  [
        '-', '-', '-',
        '-', '-', '-',
        '-', '-', '-'
      ],
      msg: 'Waiting to connect'
    }
  }

  componentDidMount() { 
    this.setupSocket() 
  }

  tileClickHandler(position) {
    let tiles = this.state.tiles
    tiles[position] = this.state.player
    this.setState({tiles: tiles})
    App.messages.makeMove({position: position, player: this.state.player})
  }

  setPlayer(player) {
    this.setState({player: player})
  }

  updateBoard(position, player) {
    let tiles = this.state.tiles
    tiles[Number(position)] = player

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
            console.log(data)
            this.setPlayer(data.player)
            break;
          case "move":
            console.log("Received move from other player")
            console.log(data);
            this.updateBoard(data.position, data.player)
            break;
          case "notify":
            console.log(data);
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
    let playerType
    let msg

    if (this.state.player != undefined) {
      playerType = (
        <div>
          You are {this.state.player}
        </div>);
    }

    if (this.state.msg != undefined) {
      msg = (
        <div>
          {this.state.msg}
        </div>);
    }

    return (
      <div id ='game'>
        { playerType }
        { msg }
        { this.state.tiles.map(function(tile, index) {
          return (
            <Tile state={tile} key={index} position={index} tileClickHandler={this.tileClickHandler.bind(this)} />
            )
        }, this) }
      </div>
    )
  }
}
