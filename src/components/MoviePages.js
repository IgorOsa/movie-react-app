import React, { Component } from "react";
import classNames from "classnames";

class MoviePages extends Component {
    render() {
        const { page, total_pages, updatePage } = this.props;

        const setDisabledLink = (k, v) => {
            return classNames('page-item', { disabled: k === v });
        };

        const handleClick = value => {
            return () => {
                updatePage(value);
            };
        };

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={setDisabledLink(page, 1)} onClick={handleClick(1)}>
                        <div className="page-link">
                            First
                        </div>
                    </li>
                    <li className={setDisabledLink(page, 1)} onClick={handleClick(page - 1)}>
                        <div className="page-link">Previous</div>
                    </li>
                    <li className='page-item'>
                        <div className="page-link no-hover">Page {page} of {total_pages}</div>
                    </li>
                    <li className={setDisabledLink(page, total_pages)} onClick={handleClick(page + 1)}>
                        <div className="page-link">Next</div>
                    </li>
                    <li className={setDisabledLink(page, total_pages)} onClick={handleClick(total_pages)}>
                        <div className="page-link">Last</div>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default MoviePages;