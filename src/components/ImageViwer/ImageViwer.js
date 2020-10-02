import React, { Component } from 'react';
import classes from './ImageViwer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
class ImageViwer extends Component {
    state = {
        base64String: "",
        name: "",
        leftButtonVisible: false,
        rightButtonVisible: false
    }
    componentDidMount() {
        let id = this.props.id;
        let index = this.props.images.findIndex(image => image.id === id);
        let image = this.props.images[index];
        if (!image) {
            this.props.history.goBack();
        } else {


            this.setState({
                base64String: image.base64String,
                name: image.name,
                id: id,
                leftButtonVisible: index > 0,
                rightButtonVisible: index < this.props.images.length - 1
            });
        }
    }

    onClickBack = () => {
        this.props.history.goBack();
    }
    onClickLeft = () => {
        let id = this.state.id;
        let images = this.props.images;
        let index = images.findIndex(image => image.id === id);
        if (index > 0) {
            this.setState({
                base64String: images[index - 1].base64String,
                name: images[index - 1].name,
                id: images[index - 1].id,
                leftButtonVisible: index - 1 > 0,
                rightButtonVisible: true
            })
        }
    }

    onClickRight = () => {
        let id = this.state.id;
        let images = this.props.images;
        let index = images.findIndex(image => image.id === id);
        if (index < images.length - 1) {
            this.setState({
                base64String: images[index + 1].base64String,
                name: images[index + 1].name,
                id: images[index + 1].id,
                leftButtonVisible: true,
                rightButtonVisible: index + 1 < images.length - 1
            })
        }
    }
    render() {
        let leftButton = this.state.leftButtonVisible ? <FontAwesomeIcon
            icon={faChevronCircleLeft}
            size='2x'
            className={classes.LeftButton}
            onClick={this.onClickLeft}
        /> : null;
        let rightButton = this.state.rightButtonVisible ? <FontAwesomeIcon
            icon={faChevronCircleRight}
            size='2x'
            className={classes.RightButton}
            onClick={this.onClickRight}
        /> : null
        return (
            <div className={classes.ImageViwer}>

                <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "white" }}
                    size='2x'
                    className={classes.BackButton}
                    onClick={this.onClickBack}
                />
                {leftButton}

                <img className={classes.Image}
                    src={"data:image/png;base64," + this.state.base64String}
                    alt={this.state.name}
                />
                {rightButton}
            </div>);
    }
}


export default ImageViwer;