import React, { useState, useEffect } from 'react'
import callAPI from './utils'
import NewsCard from '../NewsCard/NewsCard';
import { useSelector } from 'react-redux';
import './News.css'
import Loader from '../Loader/Loader'


function News() {

    const [newsArray,setNewsArray]=useState([]);
    const theme = useSelector(state=>state.theme);

    useEffect( () => {
        fetchData().then((Data)=>{
            setNewsArray(Data)
        })
    },[])

    const fetchData = async () => {
        let data = [];
        let result = await callAPI(`https://cryptopanic.com/api/v1/posts/?auth_token=e11878d3098425272a28c4d3d92989f843dedbd2&kind=news`);
        console.log(result);
        for (const item of result.results) {
            data.push(
                {
                    title:item.title,
                    published_at:item.published_at,
                    domain:item.source.domain
                }
            )
        }
        return data;
    };

    console.log(newsArray);

    return (
        <div className={theme?'news-container-night':'news-container-day'}>
        <h1>Top News</h1>
        {newsArray.length===0 && <Loader/>}
            {newsArray.map((item,index)=>{
                return(
                    <NewsCard title={item.title} domain={item.domain} published_at={item.published_at} key={index}/>
                )
            })}
        </div>
    )
}

export default News
