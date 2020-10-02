import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './FlickrSearch.css';
import axios from '../../axios-flickr';
const source = axios.CancelToken.source();

class FlickrSearch extends Component {
    state = {
        images: [],
        tag: "",
        value: "",
        page: 1,
        nextHref: null,
        hasMoreItems: true,
        keyPress: false,
        emptyResponse: false
    }
  
    callFetchImages = () => {
        if (this.state.value === "" || this.state.value.endsWith(" ")) { return };
        this.fetchImages(1).then(resp => {
            if (resp.data.photos.photo.length === 0) {
                this.setState({
                    emptyResponse: true,
                    images: resp.data.photos.photo,
                });
            } else {
                this.setState((prevState) => ({
                    images: resp.data.photos.photo,
                    page: 1,
                    keyPress: false,
                    emptyResponse: false
                }));
            }
        });
    }

    fetchImages(page) {
        return axios({
            method: 'get',
            params: {
                tags: this.state.tag,
                page: page
            }
        }, {
            cancelToken: source.token
        });
    }

    onChangeText = (event) => {
        let typedValue = event.target.value;
        this.setState({
            tag: (typedValue === "") ? "-" : this.parseTagValue(typedValue),
            value: typedValue,
            page: 1,
            keyPress: true
        }, () => {
            this.callFetchImages()
        })
    }

    parseTagValue(tag) {
        let newTag = tag.split(/(\s+)/).filter(e => e.trim().length > 0).join(",");
        return newTag;
    }
    loadMore = () => {
        if (this.state.value === "" || this.state.value.endsWith(" ") || this.state.keyPress || this.state.emptyResponse) { return };
        this.fetchImages(this.state.page + 1).then(resp => {
            let images, imagesVar;
            images = this.state.images;
            imagesVar = images.concat(resp.data.photos.photo);
            if (resp.data.photos.photo.length === 0) {
                this.setState({ emptyResponse: true });
            } else {
                this.setState((prevState) => ({
                    images: this.getUniqueValues(imagesVar),
                    page: prevState.page + 1,
                    emptyResponse: false
                }));
            }
        });
    }

    getUniqueValues(images) {
        return Array.from(new Set(images.map(s => s.id)))
            .map(id => {
                return {
                    ...images.find(x => x.id === id)
                }
            });
    }

    render() {
        let images = <p>Please enter term to search</p>;
        if (this.state.value !== "") {
            if (this.state.images.length > 0)
                images = this.state.images.map(image => (
                    <img
                        key={image.id}
                        src={image.url_n}
                        alt={image.title}
                        height="200px"
                        width="300px"
                        style={{ margin: '20px' }}
                    />));
            else {
                images = <p>Term not found</p>;
            }
        }
        return (
            <div className={classes.FlickrSearch}>
                <input type="text" placeholder="Search.." value={this.state.value} onChange={(event) => this.onChangeText(event)} />

                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<Spinner key={0} />}
                >
                    {images}
                </InfiniteScroll>

            </div>
        );
    }
}


export default FlickrSearch;