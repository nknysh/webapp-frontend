// Libraries
import React from 'react';

// Components
import Connect from '../Connect';

class Request extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (values = {}) => {
    this.setState({ isLoading: true }, () => {
      this.props.onRequest(values).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div />;
    }

    return <Connect {...this.props} handleRequest={this.handleRequest} />
  }
}

export default Request;
