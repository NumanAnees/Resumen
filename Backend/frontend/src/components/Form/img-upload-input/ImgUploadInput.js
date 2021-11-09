import React, { Component } from 'react';
import './ImgUploadInput.scss';
import manPicture from '../../../assets/young.png'
import ImageUploader from "react-images-upload";
class ImgUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = { picture: '' };
    this.onDrop = this.onDrop.bind(this);
    this.resizeImage = this.resizeImage.bind(this)
  }

   resizeImage(base64Str, maxWidth = 200, maxHeight = 300) {
    return new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        let canvas = document.createElement('canvas')
        const MAX_WIDTH = maxWidth
        const MAX_HEIGHT = maxHeight
        let width = img.width
        let height = img.height
  
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL())
      }
    })
  }
  async onDrop(pictureFiles, pictureDataURL) {
    this.setState({
      picture: await this.resizeImage(pictureDataURL)
    });
    setTimeout(() => {
      this.props.handleInputs(this.props.name, this.state.picture);
    }, 300);
  }
  render() {
    return (
      <div className="imageInputUpload">
        <div className="imageInputTitle">  Image</div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </div>);
  }
}
export default ImgUploadInput;