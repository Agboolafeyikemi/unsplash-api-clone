import React, { Component } from "react";
import style from "./SearchBar.module.scss";

class SearchBar extends Component {
  state = { val: "" };

  onInputChange = (event) => {
    this.setState({ val: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.userSubmit(this.state.val);
  };

  render() {
    const { isLoading, isSearching, isSearchend } = this.props;
    const {val} = this.state;

    let searchTemplate;
    if (isLoading && isSearching) {
      searchTemplate = (
        <h2 className={style.searchTitle}>
          Searching for{" "}
          <span className={style.formValue}>"{val}"</span>
        </h2>
      );
    } else if (isSearchend) {
      searchTemplate = (
        <h2 className={style.searchTitle}>
          Search Result for{" "}
          <span className={style.formValue}>"{val}"</span>
        </h2>
      );
    } else {
      searchTemplate = (
        <div className={style.search}>
          <form onSubmit={this.onFormSubmit}>
            <span className={style.faSearch}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#8F8B8B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.9999 19L14.6499 14.65"
                  stroke="#8F8B8B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <input
              onChange={this.onInputChange}
              placeholder="Search for photo"
            />
          </form>
        </div>
      );
    }

    return <div className={style.searchForm}>{searchTemplate}</div>;
  }
}

export default SearchBar;
