import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GenericCard from "./Card";

const GenericSection = ({ mostViewed, heading }) => {
  return (
    <Container>
      <Row className="text-center mt-5">
        <h1>
          <b>{heading}</b>
        </h1>
      </Row>
      <Row>
        {mostViewed.map((blog) => {
          return (
            <Col md={3} sm={6} lg={3} className="mt-2 mb-3" key={blog._id}>
              <GenericCard
                id={blog._id}
                title={blog.title}
                blog={blog.blog}
                user={blog.user}
                imagePath={blog.imagePath}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default GenericSection;
