import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Image from '../../components/Image/Image';
import classes from './DisplayImages.css';
import ImageViwer from '../../components/ImageViwer/ImageViwer';

class DisplayImages extends Component {
    state = {
        images: [],
        selectedId: undefined
    }
    componentDidMount() {
        this.props.onImagesFetch();
    }
    onClickImage = (id) => {
        this.props.history.push({ pathname: "/images/" + id });
        this.setState({ selectedId: id });
    }
    render() {

        let images = <Spinner />;
        if (!this.props.loading) {
            images = this.props.images.map(image =>
                <Image
                    key={image.id}
                    base64String={image.base64String}
                    name={image.name}
                    clickImage={() => this.onClickImage(image.id)}
                    canDetele={false}
                />
            );
        }

        return (
            <div className={classes.DisplayImages}>
                <Switch>
                    <Route path="/" exact render={() => images} />
                    <Route
                        path={this.props.match.url + "images/:id"}
                        render={(props) => (<ImageViwer images={this.props.images} id={this.state.selectedId}{...props} />)} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        images: state.images,
        loading: state.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onImagesFetch: () => dispatch(actions.fetchImages())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayImages);