import { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./image-tile.css";

export default class ImageTile extends Component {
  render() {
    const { content } = this.props;
    // console.log("------>", content);
    return (
      <div className="image-tile">
        <div className="main-image">
          <img src={content[0]} alt={content.name} />
          <LazyLoadImage
            alt={content.name}
            src={content[0]} // use normal <img> attributes as props
          />
        </div>
        <div className="side-image">
          {content[1] && (
            <div className="left-image">
              <LazyLoadImage src={content[1]} alt={content.name} />
            </div>
          )}
          {content[2] && (
            <div className="right-image">
              <LazyLoadImage src={content[2]} alt={content.name} />
            </div>
          )}
        </div>
        <div className="image-title">{content.name}</div>
      </div>
    );
  }
}
