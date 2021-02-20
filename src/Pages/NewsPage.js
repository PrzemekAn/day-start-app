import React from 'react';
import News from '../Components/News';
import './NewsPage.css'


const NewsPage = (props) => {
    return ( 
        <div className="newsContainer">
            <div className="search-form">
                <input type="text" placeholder = 'Search the news by topic you like' value = {props.newsSearchTopic}/>
                <button className="newsSearchSubmitButton">Submit</button>
            </div>
            <div className="newses">
                <News/>
            </div>
        </div>
     );
}
 
export default NewsPage;