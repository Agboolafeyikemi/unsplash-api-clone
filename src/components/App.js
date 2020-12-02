import React from "react";
import axios from "axios";
import SearchBar from "./Search/SearchBar";
import Style from "./App.module.scss";
import Modal from "./Modal/Modal";
import ImageList from "./ImageList/ImageList";

class App extends React.Component {
  state = {
    images: [],
    loading: false,
    isSearching: false,
    isSearchend: false,
  };

  ROOT = `https://api.unsplash.com/`;
  KEY = `?client_id=0swmL3nv8dazLh42kAr2eHn3t0ApL7g5IgFKSMmjFcM`;
  PERPAGE = `&per_page=8`;

  onSearchSubmit = (query) => {
    this.setState({ loading: true, isSearching: true });
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=0swmL3nv8dazLh42kAr2eHn3t0ApL7g5IgFKSMmjFcM`
      )
      .then((data) => {
        this.setState({
          images: data.data.results,
          loading: false,
          isSearching: false,
          isSearchend: true,
        });
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
      });
  };

  fetchInitialImages = () => {
    this.setState({ loading: true });
    axios
      .get(`${this.ROOT}photos${this.KEY}${this.PERPAGE}&page=1`)
      .then((res) => {
        let results = res.data;
        this.setState(() => {
          return { images: results, loading: false };
        });
      })
      .catch((error) => console.log(error));
  };

  clickHandler = (image) => {
    this.setState({ imageClick: !this.state.imageClick, imageInfo: image });
  };

  componentDidMount() {
    this.fetchInitialImages();
  }

  render() {
    const { images, loading, isSearching, isSearchend } = this.state;
    return (
      <div className={Style.AppContainer}>
        <div>
          <SearchBar
            userSubmit={this.onSearchSubmit}
            isLoading={loading}
            isSearching={isSearching}
            isSearchend={isSearchend}
          />
        </div>
        <div className={Style.placeholderCardList}>
          {(loading || isSearching) &&
            new Array(6).fill(2).map(() => (
              <div className={Style.placeholder}>
                <div
                  className={Style.placeholderItem}
                  style={{ width: "200px", height: "300px" }}
                >
                  <div
                    className={Style.authorNamePlaceholder}
                    style={{ width: "50px", height: "10px" }}
                  ></div>
                  <div
                    className={Style.imageLocationPlaceholder}
                    style={{ width: "50px", height: "10px" }}
                  ></div>
                </div>
              </div>
            ))}
          <ImageList images={images} />
        </div>
      </div>
    );
  }
}

export default App;
