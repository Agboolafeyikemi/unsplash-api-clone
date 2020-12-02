import React, { Component, Fragment } from "react";
import Style from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { pic } = this.props;
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={Style.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          <div className={Style.card}>
            <img
              style={{ width: "100%", height: "30%" }}
              alt={pic.alt_description}
              src={pic.urls.full}
            ></img>
            <div className={Style.textContainer}>
              <div className={Style.authorName}>{pic.user.first_name}</div>
              <div className={Style.imageLocation}>{pic.user.location}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Modal;
