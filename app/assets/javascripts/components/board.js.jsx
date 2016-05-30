class Board extends React.Component {
	constructor() {
    super()
		this.state = {
			tiles:  [
      '', '', '',
      '', '', '',
      '', '', ''
      ]
    }
  }

  render () {
    return (
     <div id ='board'>
     { this.state.tiles.map(tile => ( <Tile />)) }
     </div>
     )
  }
}