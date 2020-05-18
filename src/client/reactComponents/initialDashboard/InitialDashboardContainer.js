import React, { Component } from "react";
// import ThingToPutInView from "./ThingToPutInView"


/**
 * This file just contains its subcomponents, to keep things organized.  Now that the entryfile has loaded this file, this file loads all the subcomponents.
 */

class InitialDashboardContainer extends Component {
  constructor() {
    super();

    this.state = {
    };

    this.someFunctionWeDefine = this.someFunctionWeDefine.bind(this);
  }

  someFunctionWeDefine() {
    console.log('Yay' )
  }

  render() {
    return (
      <div className="container-fluid bg-example">
        <h3>This is a prototype of registration button & function</h3>
        <button className="btn btn-primary btn-lg">Button text</button>
        <br/>
        <br/>
        <button className="btn btn-secondary btn-sm">Button text</button>
        <br/>
        <br/>
        <button className="btn btn-warning btn-sm">Button text</button>
        <br/>
        <br/>
        <button className="btn btn-info btn-sm">Button text</button>
      </div>
    );
  }
}

export default InitialDashboardContainer;

// Redux example For reference, in this case for toggling visibility of a tasklist, for a "Viewport_TaskList" component

// const mapStateToProps = store => ({
//   visibility_viewport_taskList: store.visibility_viewport_taskList
// })

// const mapDispatchToProps = {
//   toggle_Visibility_Viewport_TaskList
// }

// export default connect(
//   // mapStateToProps, // <-- just kept as a reminder in this reference example
//   null,               // <-- using Null, since mapStateToProps isnt used in this case. Just a reminder to use null here when not using mapStateToProps
//   mapDispatchToProps
// )(Viewport_TaskList);