import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
// import Spinner from './Spinner';
// import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  articles = [
    {}
  ]

  static defaultProps = {
    category: "general"
  }

  static propTypes = {
    category: PropTypes.string
  }

  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      page: 1,
      prsd: 0,
      loading: false
    }

    document.title = `${this.capitalize(this.props.category)}-News App`;
  }

  async updatenews() {
    this.setState({
      loading: true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d72d1b864b574ce0bcacd3ac983bca8d&page=${this.state.page}&pageSize=20`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      prsd: Math.ceil(parseddata.totalResults / 20),
      loading: false,
      totalResults:parseddata.totalResults
    });
  }

  async componentDidMount() {
    this.updatenews()
  }

  render() {
    let handlePre = async () => {
      await this.setState({
        page: this.state.page - 1
      })

      this.updatenews();
    }

    let handlenex = async () => {
      await this.setState({
        page: this.state.page + 1
      })
      this.updatenews();
    }
    return (
      <div className='container my-3'>
        <h1 className="container d-flex justify-content-center">Top {this.capitalize(this.props.category)} Headlines</h1>

        {/* {this.state.loading && <Spinner />} */}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        ></InfiniteScroll> */}

        {/* {this.state.loading} */}
        <div className="row my-3">
          {this.state.articles.map((ele, index) => {

            return <div className="col-md-4 my-2" key={index}>
              <NewsItem title={ele.title} url={ele.url} imageurl={ele.urlToImage} description={ele.description} publishedAt={ele.publishedAt} author={ele.author} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} className="btn btn-primary" type="pre" onClick={handlePre}>&larr; Previous</button>
          <button disabled={this.state.page >= this.state.prsd} className="btn btn-primary" type="nex" onClick={handlenex}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
