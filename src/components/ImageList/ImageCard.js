import React, {Fragment} from "react";
import Style from "./ImageList.module.scss";
import Modal from "../Modal/Modal";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0,
      imageClick: false,
      imageInfo: {},
    };

    this.imageRef = React.createRef();
  }

  clickHandler = (image) => {
    this.setState({ imageClick: !this.state.imageClick, imageInfo: image });
  };

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;

    const spans = Math.ceil(height / 10 + 1);

    this.setState({ spans: spans });
  };

  render() {
    const { description, urls, user } = this.props.image;
    const {imageClick} = this.state;
    return (
     <Fragment>
        <div
            style={{
            gridRowEnd: `span ${this.state.spans}`,
            position: "relative",
            textAlign: "center",
            color: "white",
            }}
            classname={Style.cardContainer}
        >
            <img
            ref={this.imageRef}
            alt={description}
            src={urls.regular}
            className={Style.cardImage}
            onClick={() => this.clickHandler(this.props.image)}
            />
            <div className={Style.authorName}>{user.first_name}</div>
            <div className={Style.imageLocation}>{user.location}</div>
        </div>
        {imageClick && (
            <Modal
            show={this.state.imageClick}
            modalClosed={this.clickHandler}
            pic = {this.state.imageInfo}
            />
        )}
      </Fragment>
    );
  }
}

export default ImageCard;
