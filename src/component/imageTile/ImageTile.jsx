import { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./image-tile.css";

export default class ImageTile extends Component {
  render() {
    const { content } = this.props;

    return (
      <div className="image-tile">
        <div className="main-image">
          <img src={content.imageUrl0} alt={content.name} />
          <LazyLoadImage
            alt={content.name0}
            src={content.imageUrl0} // use normal <img> attributes as props
          />
        </div>
        <div className="side-image">
          {content.imageUrl1 && (
            <div className="left-image">
              <LazyLoadImage src={content.imageUrl1} alt={content.name1} />
            </div>
          )}
          {content.imageUrl2 && (
            <div className="right-image">
              <LazyLoadImage src={content.imageUrl2} alt={content.name2} />
            </div>
          )}
        </div>
        <div className="image-title">
          <div className="heading">{content.name0}</div>
          <div className="sub-heading">
            {content.name1}{" "}
            <span>{content.name2}</span>
          </div>
        </div>
      </div>
    );
  }
}
