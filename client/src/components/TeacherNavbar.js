import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Badge from "material-ui/Badge";
import * as Events from "../actions/events";
import { fetchNotifications } from "../actions/notifications";

class TeacherNavbar extends Component {
  constructor(props) {
    super(props);

    this.props.socket.on(Events.REFRESH_NOTIFICATIONS, () => {
      console.log("REFRESHING!!!");
      this.props.dispatch(fetchNotifications());
    });
  }

  logout = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-left">
          <NavLink to="/">
            <h1>Kids' Productivity App</h1>
          </NavLink>
        </div>
        <div className="navbar-mid">
          <ul>
            <NavLink to="/students">
              <li>
                <i className="fa fa-graduation-cap" aria-hidden="true" />
              </li>
            </NavLink>
            <NavLink to="/tasks">
              <li>
                <i className="fa fa-tasks" aria-hidden="true" />
              </li>
            </NavLink>
            <NavLink to="/rewards">
              <li>
                <i className="fa fa-gift" aria-hidden="true" />
              </li>
            </NavLink>
            <NavLink to="/reports">
              <li>
                <i className="fa fa-file-text" aria-hidden="true" />
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <NavLink to="/notifications">
              <li>
                <i className="fa fa-comment" aria-hidden="true" />
              </li>
              {this.props.notifications.length}
            </NavLink>
            <NavLink to="/profile">
              <li>
                <i className="fa fa-user" aria-hidden="true" />
              </li>
            </NavLink>
            <a href="" onClick={this.logout}>
              <li>
                <i className="fa fa-sign-out" aria-hidden="true" />
              </li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

export default TeacherNavbar;
