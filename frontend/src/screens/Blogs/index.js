import React, { useEffect, useState } from 'react'
import axios from "axios"
import MostViewed from '../../components/BlogSections/MostViewedSection'
import LatestSection from '../../components/BlogSections/LatestSection'
import Loader from '../../components/Loader'
import './index.css'



const Blogs = () => {

    const [loading, setLoading] = useState(true)

    const [mostViewed, setMostViewed] = useState([])
    const [latest, setLatest] = useState([])
    const [oldArticles, setOldArticles] = useState([])

    const [selected, setSeleted] = useState({})
    const [list, setList] = useState([])


    useEffect(() => {
        const getBlogs = async () => {
            const { data } = await axios.get("/api/blogs")
            setMostViewed(data.mostViewed)
            setLatest(data.latest)
            setOldArticles(data.oldArticles)
            setSeleted(data.latest[0])
            setList(data.latest.slice(1))
            setLoading(false)
        }

        getBlogs()

        return () => {
            setMostViewed([])
            setLatest([])
            setOldArticles([])
        };
    }, [])

    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL}${selected.imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
    };

    const handleListClick = (index) => {
        setSeleted(list[index])
        setList(latest.filter(blog => blog.title !== list[index].title))
    }

    return (
        <div className={loading ? 'temp-height' : 'blog-main-container'}>
            {loading ? <Loader /> :
                <>
                    <LatestSection latest={list} selected={selected} handleListClick={handleListClick} styles={styles} />
                    <MostViewed mostViewed={mostViewed} />
                </>
            }
        </div>
    )
}
export default Blogs