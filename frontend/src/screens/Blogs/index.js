import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import LatestSection from '../../components/BlogSections/LatestSection';
import Loader from '../../components/Loader';
import GenericSection from '../../components/BlogSections/GenericSection';
import './index.css';

const Blogs = () => {
  const [loading, setLoading] = useState(true);

  const [mostViewed, setMostViewed] = useState([]);
  const [latest, setLatest] = useState([]);
  const [oldArticles, setOldArticles] = useState([]);

  const [selected, setSeleted] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const { data } = await axios.get('/api/blogs');
      setMostViewed(data.mostViewed);
      setLatest(data.latest);
      setOldArticles(data.oldArticles);
      setSeleted(data.latest[0]);
      setList(data.latest.slice(1));
      setLoading(false);
    };

    getBlogs();

    return () => {
      setMostViewed([]);
      setLatest([]);
      setOldArticles([]);
    };
  }, []);

  const styles = {
    backgroundImage: `url(${selected.imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  };

  const handleListClick = (index) => {
    setSeleted(list[index]);
    setList(latest.filter((blog) => blog.title !== list[index].title));
  };

  return (
    <div className={loading ? 'temp-height' : 'blog-main-container'}>
      {loading ? (
        <Loader message="Fetching Blogs..." />
      ) : (
        <>
          <Container>
            <Row>
              <Col className="mt-5" md={3} lg={3} sm={12} xs={12}>
                <Button variant="dark" className="ml-auto w-100">
                  <a style={{ textDecoration: 'none', color: 'white' }} href="/blogs/create">
                    Write your Own Blog
                  </a>
                </Button>
              </Col>
            </Row>
          </Container>
          <LatestSection
            latest={list}
            selected={selected}
            handleListClick={handleListClick}
            styles={styles}
          />
          <GenericSection mostViewed={mostViewed} heading="Most Viewed Blogs" />
          <GenericSection mostViewed={oldArticles} heading="Old Articles" />
        </>
      )}
    </div>
  );
};
export default Blogs;
