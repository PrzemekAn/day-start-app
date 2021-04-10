import React from 'react';
import ConnectionDetails from '../Components/ConnectionDetails';

const TransportPage = (props) => {
    return ( 
        <ConnectionDetails getTransport = {props.getTransport}/>
     );
}
 
export default TransportPage;