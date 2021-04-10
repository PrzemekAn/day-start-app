import React from 'react';
import '../Styles/NewsPage.css'

const News = (props) => {
    return ( 
        <div className="news">
            <p className="news-title">{props.title}</p>
            <p className="news-date">{props.published_date}</p>
            <p className="news-summary">{props.summary}</p>
            <a className="detail"href = {props.link} target = '_blank'>{props.link}</a>
        </div>
     );
}
 
export default News;