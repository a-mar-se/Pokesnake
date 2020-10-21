import React from 'react';

class PokemonOnScreen extends React.Component {
  render() {
    console.log(this.props.img);
    return (
      <div>
        <img src={this.props.img} alt={this.props.name} />
        {/* <h5>
          {this.props.id}.{this.props.name}
        </h5> */}
      </div>
    );
  }
}
export default PokemonOnScreen;
