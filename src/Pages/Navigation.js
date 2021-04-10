import React from 'react';
import '../Styles/Navigation.css';
import  {Link} from 'react-router-dom';

const Navigation = (props) => {

    
    return ( 
        <div className={props.isClicked? 'navigation active': 'navigation'} >
            <i className="fas fa-bars" onClick = {props.clickEv}></i>
            <ul>
                <li className = 'list-item'><Link to = '/'><i class="fas fa-home"></i>Home</Link></li>
                <li className = 'list-item'><Link to = '/weather'><i class="fas fa-cloud"></i>Weather</Link></li>
                <li className = 'list-item'><Link to = '/todo'><i class="fas fa-clipboard-list"></i> ToDo</Link></li>
                <li className = 'list-item'><Link to = '/news'><i class="fas fa-newspaper"></i> News</Link></li>
                <li className = 'list-item'><Link to = '/transport'><i class="fas fa-tram"></i> Transport</Link></li>
            </ul>
        </div>

     );
}
 
export default Navigation;