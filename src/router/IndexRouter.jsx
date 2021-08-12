import { Spin } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
 function IndexRouter(props) {
  return (
    <HashRouter className="switch">
      <Spin size="large" spinning={props.isLoading}>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={NewsSandBox}></Route> */}
        <Route path="/" render={() =>
          localStorage.getItem('token')?
          <NewsSandBox />:
          <Redirect to="/login" />
        } />
      </Switch>
      </Spin>
    </HashRouter>
  )
}
const mapStateToProps=({LoadingReducer:{isLoading}})=>({
  isLoading
})
export default connect(mapStateToProps)(IndexRouter)