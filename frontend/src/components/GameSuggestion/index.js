import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HomePageCard from '../HomePageCard';

function GameSuggestions({ suggestionGames }) {
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 2;
  const totalGames = suggestionGames.length;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // Calculate the range of games to display based on current page
  const indexOfLastGame = (currentPage + 1) * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = suggestionGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <Container className="mb-3">
      <Row className="text-center mt-5">
        <h1 style={{ fontWeight: 'bolder' }}>Games Suggestions For You</h1>
      </Row>
      <Row className="mt-5 w-100 d-flex justify-content-center">
        <Col md={2} sm={12} lg={2} className="d-flex align-items-center justify-content-center">
          <Button variant="dark" onClick={handlePreviousPage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Col>
        {currentGames.map((game) => (
          <Col md={4} sm={12} lg={4} key={game.id}>
            <HomePageCard game={game.game} />
          </Col>
        ))}
        <Col md={2} sm={12} lg={2} className="d-flex align-items-center justify-content-center">
          <Button variant="dark" onClick={handleNextPage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default GameSuggestions;
