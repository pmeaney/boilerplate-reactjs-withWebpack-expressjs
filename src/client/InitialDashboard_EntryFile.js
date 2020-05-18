import React from "react"
import ReactDOM from "react-dom"
import './scss/bootstrap4Styles/bootstrapCompileConfig.scss'

// import reducer from "./reactComponents/initialDashboard/redux/reducer"
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

// const store = createStore(reducer)

import InitialDashboardContainer from "./reactComponents/initialDashboard/InitialDashboardContainer"

/* Here we want to take the session and based on the user type, deliver the appropriate dashboard */
ReactDOM.render(
  // <Provider store={store}>
    <InitialDashboardContainer />,
  // </Provider>,
  document.getElementById("react-root")
)
