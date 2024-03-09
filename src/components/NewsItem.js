import React, { Component } from 'react';
import img from './images/rubaitul-azad-Zf0qvrAjy58-unsplash.jpg'

export class NewsItem extends Component {
  
  render() {
    //this is called destructuring.
    let {title, description, imageurl,url,publishedAt,author}=this.props;

    let da=new Date(publishedAt);
    if(imageurl===null)
    {
      imageurl=img;
    }
    return (
      <div>
        <div className="card">
          <img src={imageurl} className="card-img-top news-img" alt="..."/>

            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {(author==null)? "Unknown" : author} on {da.toGMTString()}</small></p>
              <a href={url} className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
