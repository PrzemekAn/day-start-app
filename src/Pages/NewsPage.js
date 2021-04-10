import React from 'react';
import News from '../Components/News';
import '../Styles/NewsPage.css'


const NewsPage = (props) => {

    const newses = [...props.news];

    
    const news = newses.map(item => <News key = {item._id} title = {item.title} published_date = {item.published_date} summary = {item.summary} link = {item.link}/>)
    
    
    
    return ( 
        <div className="newsContainer">
            <div className="search-form">
                <input type="text" placeholder = 'Search the news by topic you like' value = {props.newsSearchTopic} onChange = {props.changeHandler}/>
                <button className="newsSearchSubmitButton" onClick = {props.getNews}>Submit</button>
            </div>
            <div className="newses">
                {news}
            </div>
        </div>
     );
}
 
export default NewsPage;