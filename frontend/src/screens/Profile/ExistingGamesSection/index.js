import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GameCard from '../../../components/GameCard'
import axios from 'axios'

const ExistingGameSection = ({ userGames, setUserGames }) => {

    const handleGameDeletion = async (_id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/games/delete/${_id}`)
            if (data.success) {
                setUserGames(userGames.filter(game => game._id !== _id))
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return (
        <Container
            style={{ minHeight: "50vh", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.75)" }}
            className='mb-5 p-5'
        >
            <h1 className='text-center mt-3'>My Games Currently On Sale</h1>
            <Row className='mt-3'>
                {
                    userGames.map((game) => {
                        return (
                            <Col key={game._id} md={6} lg={6} sm={12} xs={12} className='p-2'>
                                <GameCard
                                    title={game.title}
                                    price={game.price}
                                    description={game.description}
                                    isGame={game.isGame}
                                    imagePath={game.imagePath}
                                    createdAt={game.createdAt}
                                    _id={game._id}
                                    handleGameDeletion={handleGameDeletion}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default ExistingGameSection