import React from "react";
import axios from "axios";
import unsplash from "./api/unsplash";
import SearchBar from "./Search/SearchBar";
import Style from "./App.module.scss";
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

  onSearchSubmit = async (term) => {
    this.setState({ loading: true, isSearching: true });
    const response = await unsplash.get("/search/photos", {
      params: {
        query: term,
      },
    });
    this.setState({
      images: response.data.results,
      loading: false,
      isSearching: false,
      isSearchend: true,
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
