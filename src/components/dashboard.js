import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addThing, addThingAsync,fetchThingsAsync } from '../store/thing';
import Things from './things'
import ThingForm from './ThingForm';
class Dashboard extends Component {
  componentDidMount(){
   this.props.fetchThingsAsync();
  }
  render() {
    return (
      <Fragment>
        <h1>Dashboard</h1>
        <h2>Thing count: {this.props.things.length}</h2>
        
        <ThingForm onComplete={this.props.addThingAsync} buttonText="Add" />
        {this.props.things.length ?
          
          <ul>
            {this.props.things.map((thing,i) => {return <Things key={thing.id || i } thing={thing}/>})}
          </ul>
          
          :
          
          <h2>No things :(</h2>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ thingState }) => ({ things: thingState });
const mapDispatchToProps = { addThing, addThingAsync,fetchThingsAsync };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);