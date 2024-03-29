import React from 'react';
import $ from 'jquery';
import gambler from './images/gambler.png';
import ImageAvatars from './Avatar';
import { makeStyles } from '@material-ui/core/styles';

export default class PictureUploader extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }


  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  renderPreview() {
    if(this.state.src) {
      return (
        // <Avatar alt="containerprofile-dice" src={this.state.src}/>
        <ImageAvatars photo={this.state.src}/>
      );
    } else {
      return (
        <p>
          <ImageAvatars photo={gambler}/>
        </p>
      );
    }
  }

  // upload() {
  //   var formData = new FormData();

  //   formData.append("file", this.state.picture);

  //   $.ajax({
  //     url: "/some/api/endpoint",
  //     method: "POST",
  //     data: formData,
  //     cache: false,
  //     contentType: false,
  //     processData: false,
  //     success: function(response) {
  //       // Code to handle a succesful upload
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <h5>Please upload your profile picture</h5>

        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div>
        {this.renderPreview()}
        </div>
        <hr/>
      </div>
    );
  }
}
