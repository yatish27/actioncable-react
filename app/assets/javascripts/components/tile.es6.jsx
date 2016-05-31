class Tile extends React.Component {
  clickHandler() {
    console.log(this.props)
    this.props.tileClickHandler(this.props.position);
  }

  render () {
    return (
    	<div className='tile' onClick={this.clickHandler.bind(this)}>
        {this.props.state}
      </div>
    	)
  }
}

