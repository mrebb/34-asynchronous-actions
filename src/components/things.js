import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeThingAsync, updateThingAsync,fetchThingsAsync } from '../store/thing'; 
import ThingForm from './ThingForm';
import styled from 'styled-components';

const Div = styled.div`
  margin: 40px;
  align-content: center;
  width:175px;
  background-color: rgb(204, 255, 204);
  border-radius: 25px;
  border: 5px outset rgb(255, 153, 153);
  &:hover {
   background-color: rgb(153, 204, 255);
 }
`;

class ThingItem extends Component {
    componentDidMount(){
        this.props.fetchThingsAsync();
       }
  state = {
    editing: false
  }

  onDelete = () => {
    this.props.removeThingAsync(this.props.thing);
  }

  onEdit = () => {
    this.setState({ editing: true })
  }

  onUpdate = (thing) => {
    this.props.updateThingAsync(thing);
    this.setState({editing: false});
  }

  render() {
    return (
    <Div>
      <li onDoubleClick={this.onEdit}>
        <p>
          {this.props.thing.name}
        </p>
        <p>
          <button onClick={this.onDelete}>x</button>
        </p>

        {this.state.editing && <ThingForm onComplete={this.onUpdate} buttonText="Edit" thing={this.props.thing} />}
      </li>
      </Div>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  removeThingAsync: thing => dispatch(removeThingAsync(thing)),
  updateThingAsync: thing => dispatch(updateThingAsync(thing)),fetchThingsAsync,
});

ThingItem.propTypes = {
  removeThingAsync: PropTypes.func,
  updateThingAsync: PropTypes.func,
  thing: PropTypes.object,
}

export default connect(null, mapDispatchToProps)(ThingItem);


