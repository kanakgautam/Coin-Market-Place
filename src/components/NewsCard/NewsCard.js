import React from 'react'
import './NewsCard.css'

function NewsCard(props) {

    const {title,domain,published_at,key}=props;

    return (
        <div className='news-card'>
            <h3 className='card-heading'>{title}</h3>
            <div className='card-details'>
            <a className='card-link' href={`https://${domain}`}>{domain}</a> 
            {/* <p>{published_at}</p> */}
            </div>
            
        </div>
    )
}

export default NewsCard
