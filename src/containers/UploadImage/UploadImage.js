import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-images';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Image from '../../components/Image/Image';
import classes from './UploadImage.css';

class UploadImage extends Component {
    state = {
        selectedFile: null,
        selectedFileB64: null,
        images: [],
        uploadDone: false,
    }
    componentDidMount() {
        this.props.onImagesFetch();
    }
    onChangeFile = (event) => {
        let selectedFile = event.target.files[0]
        var reader = new FileReader();
        reader.onloadend = () => {
            const b64 = reader.result.replace(/^data:.+;base64,/, '');
            this.setState({
                selectedFile: selectedFile,
                selectedFileB64: b64,
                uploadDone: false
            });

        };
        reader.readAsDataURL(selectedFile);
    }
    onUpload = () => {
        let data = {
            name: this.state.selectedFile.name,
            base64String: this.state.selectedFileB64
        }
        axios.post('/images.json', data)
            .then(res => {
                this.setState({ uploadDone: true, });
                this.fileInput.value = ""
                this.props.onImagesFetch();
            });

    }
    onClickRemove(id) {
        this.props.onDeleteImage(id);
    }
    render() {
        let images = <Spinner />;
        if (this.props.error) {
            images = <p>{this.props.error.message}</p>;
        }
        else if (!this.props.loading) {
            images = this.props.images.map(image =>
                <Image
                    key={image.id}
                    id={image.id}
                    base64String={image.base64String}
                    name={image.name}
                    clickRemove={() => this.onClickRemove(image.id)}
                    canDelete
                />
            );
        }
        let uploadedImage = (this.state.selectedFile && !this.state.uploadDone) ? (
            <Image
                base64String={this.state.selectedFileB64}
                name={this.state.selectedFile.name}
                canDelete={false}
            />
        ) : null;
        return (
            <div className={classes.UploadImage}>
                <h1>Select image to upload</h1>

                <label htmlFor="file"
                    className={classes.FileUpload}
                >Choose Image</label>
                <input type="file"
                    ref={ref => this.fileInput = ref}
                    className={classes.File}
                    id="file"
                    accept="image/*"
                    onChange={this.onChangeFile}>
                </input>
                {uploadedImage}

                <button onClick={this.onUpload} className={classes.FileUpload}>Upload</button>
                <hr />
                {images}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        images: state.images,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onImagesFetch: () => dispatch(actions.fetchImages()),
        onDeleteImage: (id) => dispatch(actions.deleteImage(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);