import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SearchGameCard from '../SearchGameCard'

const SearchGamesDisplayArea = (
    { gamesData }
) => {
    return (
        <Container className='mt-5'>
            <Row>

                {gamesData.map(game => {
                    return (
                        <Col key={game._id} md={6} lg={6} sm={12} xs={12} className='p-2'>
                            <SearchGameCard
                                _id={game._id}
                                title={game.title}
                                price={game.price}
                                isGameNew={game.isGameNew}
                                imagePath={game.imagePath} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default SearchGamesDisplayArea