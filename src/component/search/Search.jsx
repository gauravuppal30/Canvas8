import React, { Component } from "react";
import ImageTile from "../imageTile/ImageTile";
import loader from "../../loader.gif";
import "./search.css";
import testJson from "../../static/data.json";
// import { debounce } from "../../utils";

export default class Search extends Component {
  state = {
    searchResult: [],
    isSearchLoading: true,
    searchKey: "",
  };

  componentDidMount() {
    this.searchApi();
  }

  searchApi = () => {
    // fetch(
    //   `http://authoring.canvas8.com:8080/share/form-controller/reactive/service-search.jsp?query=${this.state.searchKey}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);

    const filterData = testJson.filter(
      (item) => item.name && item.name.includes(this.state.searchKey)
    );
    //console.log("filtered", filterData);
    //const result = this.groupByN(3, testJson);
    const result = this.groupByN(3, filterData);
    this.setState({
      searchResult: result,
      isSearchLoading: false,
    });
    // });
  };

  transformNameIntoSingle = (str) => {
    return str
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace(/\d{1,2}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}/g, "")
      .split("-")
      .join(" ");
  };

  transformObjectIntoSingle = (data) => {
    if (data && data.length > 0) {
      let newObj = { name: "" };
      data.map(
        (item, index) =>
          // console.log("item", item);
          (newObj = {
            ...newObj,
            [index]: item.imageUrl,
            name: `${newObj.name} ${this.transformNameIntoSingle(item.name)}`,
          })
      );

      return newObj;
    }
  };

  groupByN = (n, data) => {
    let result = [];
    for (let i = 0; i < data.length; i += n) {
      result.push(this.transformObjectIntoSingle(data.slice(i, i + n)));
    }
    return result;
  };

  clearSearch = () => {
    this.setState({ searchKey: "" }, () => this.searchApi());
  };

  onSearch = (e) => {
    const input = e.target.value;
    const term = input.trim();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (term) {
      this.setState(
        {
          isSearchLoading: true,
          searchKey: term,
        },
        () =>
          (this.timeout = setTimeout(() => {
            this.searchApi();
          }, 500))
      );
    } else {
      this.clearSearch();
    }
  };

  renderTile = () => {
    const { searchResult } = this.state;
    if (searchResult.length > 0)
      return searchResult.map((tile, index) => (
        <ImageTile content={tile} key={index} />
      ));

    return "No Result found. Please search with different keyword.";
  };

  render() {
    const { isSearchLoading } = this.state;
    return (
      <div className="search-container">
        <div className="search-leftbar">
          <label htmlFor="search">Search</label>
          <input
            type="search"
            name="search"
            placeholder="Search here"
            value={this.state.searchKey}
            onChange={this.onSearch}
          />
        </div>
        <div className="search-rightview">
          {isSearchLoading ? (
            <img src={loader} className="loader" alt="loader" />
          ) : (
            this.renderTile()
          )}
        </div>
      </div>
    );
  }
}
