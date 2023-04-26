import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import './index.css'
import GameInfoSection from './GameInfoSection'
import ExistingGameSection from './ExistingGamesSection'
import Loader from '../../components/Loader'
import axios from 'axios'

const Profile = () => {

    let history = useNavigate()
    let dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading } = userDetails

    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [city, setCity] = useState("")
    const [gameFetchLoading, setGameFetchLoading] = useState(false)
    const [userGames, setUserGames] = useState([{}])

    const initials = userName.charAt(0).toUpperCase()

    const setInfo = () => {
        setEmail(user.email)
        setUserName(user.userName)
        setCity(user.city)
    }

    useEffect(() => {
        const fetchUserGames = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/games/user_games/${userInfo._id}`)
            console.log(data)
            setUserGames(data.userGames)
            setGameFetchLoading(false)
        }
        if (!userInfo) {
            history("/")
        } else {
            setGameFetchLoading(true)
            fetchUserGames()
            if (!user || !user.email) {
                dispatch(getUserDetails('profile', userInfo))
            } else {
                setInfo()
            }
        }
    }, [dispatch, history, userInfo, user])

    return (
        <Container>
            {(loading || gameFetchLoading) ?
                <div style={{ height: "100vh" }}><Loader message={"Loading"} /> </div> : <>
                    <Row className='mt-5'>
                        <Col md={3} lg={3} sm={12} xs={12} className='avatar-col p-5'>
                            <Row style={{ height: "30vh" }} className='p-2'>
                                <Badge
                                    bg="dark"
                                    className="initials-badge rounded-circle avatar-style"
                                >
                                    {initials}
                                </Badge>
                            </Row>
                            <Row className='p-2'>
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <h4 className='text-center'>{userName}</h4>
                                </Col>
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <h6 className='text-center'>{email}</h6>
                                </Col>
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <h6 className='text-center'>{city}</h6>
                                </Col>
                            </Row>
                            <Row className='mb-2 mt-2 p-2'>
                                <a
                                    style={{ textDecoration: "none", color: "white" }}
                                    href="/profile/edit"
                                >
                                    <Button
                                        className='w-100'
                                        variant='dark'
                                    >
                                        Edit Profile
                                    </Button>
                                </a>

                            </Row>
                        </Col>
                        <Col md={9} lg={9} sm={12} xs={12}>
                            <Row>
                                <GameInfoSection id={userInfo._id} setUserGames={setUserGames} />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <ExistingGameSection userGames={userGames} setUserGames={setUserGames} />
                    </Row>
                </>}
        </Container >
    )
}

export default Profile