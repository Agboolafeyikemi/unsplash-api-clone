import React from "react";
import Style from "./ImageList.module.scss";

class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {spans: 0};

        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener("load", this.setSpans);
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;

        const spans = Math.ceil(height / 10 + 1);

        this.setState({spans: spans});
    };

    render() {
        const {description, urls, user} = this.props.image;
        return (
              <div   style={{gridRowEnd: `span ${this.state.spans}`,position:"relative",textAlign:"center",color: "white"}} classname={Style.cardContainer}>
                <img ref={this.imageRef} alt={description} src={urls.regular} className={Style.cardImage}/>
                <div className={Style.authorName}>{user.first_name}</div>
                <div className={Style.imageLocation}>{user.location}</div>
            </div>
        );
    }
}

export default ImageCard;
