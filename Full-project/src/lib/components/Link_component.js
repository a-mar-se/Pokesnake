import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LinkComponent extends React.Component {
  render() {
    return (
      <Link className="linkComponent" to={{ pathname: `/${this.props.text}` }}>
        {this.props.text}
      </Link>
    );
  }
}
export default withRouter(LinkComponent);
