import React, { Component } from "react";
import PropTypes from 'prop-types';
class ThingForm extends Component {
  
  constructor(props) {
    super(props);
    this.defaultState = {
    name: '',
    id: ''
    };
    const initialState = this.props.thing || this.defaultState;
    this.state =  {...initialState};
  }
  
  onSubmit = event => {
    event.preventDefault();
    this.props.onComplete(this.state);
    if(this.props.onUpdate){
        this.props.onUpdate(this.state);
    }
    this.setState({ ...this.defaultState });
  };

  onChange = event => {
    const changedBit = {
      [event.target.name]: event.target.value
    };
    this.setState(changedBit);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input name="name" placeholder="thing" value={this.state.name} onChange={this.onChange} />
        <button>{this.props.buttonText}</button>
      </form>
    );
  }
}

ThingForm.propTypes = {
  onComplete: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  thing: PropTypes.object,
}
export default ThingForm;