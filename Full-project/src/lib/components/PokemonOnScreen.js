import React from 'react';

class PokemonOnScreen extends React.Component {
  render() {
    console.log(this.props.img);
    return (
      // <div>
      <img src={this.props.img} alt={this.props.name} />

      // </div>
    );
  }
}
export default PokemonOnScreen;
