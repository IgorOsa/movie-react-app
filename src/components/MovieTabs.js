import React, { Component } from "react";
import classNames from "classnames";

class MovieTabs extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate");
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = value => {
      return () => {
        updateSortBy(value);
      };
    };

    const setActiveTab = value => {
      return classNames('nav-link', { active: value === sort_by });
    };

    return (
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <div
            className={setActiveTab("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity Desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={setActiveTab("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue Desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={setActiveTab("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote Average Desc
          </div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
