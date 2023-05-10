import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import GameInfoSection from './GameInfoSection'
import ExistingGameSection from './ExistingGamesSection'
import BlogsSection from './BlogsSecton'
import Loader from '../../components/Loader'
import axios from 'axios'
import './index.css'


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
    const [userBlogs, setUserBlogs] = useState([{}])
    const [userCertificates, setUserCertificates] = useState([{}])

    const initials = userName.charAt(0).toUpperCase()

    const setInfo = () => {
        setEmail(user.email)
        setUserName(user.userName)
        setCity(user.city)
    }

    const handleCertificateClick = async (_id) => {
        history(`/certificate/${_id}`)
    }

    useEffect(() => {
        const fetchUserGames = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/games/user_games/${userInfo._id}`)
            setUserGames(data.userGames)
            setGameFetchLoading(false)
        }
        const fetchUserBlogs = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/blogs/user_blogs/${userInfo._id}`)
            setUserBlogs(data.blogs)
        }
        const fetchUserCertificates = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/certificate/user_certificates/${userInfo._id}`)
            setUserCertificates(data.certificates)
            console.log(data)
        }
        if (!userInfo) {
            history("/")
        } else {
            setGameFetchLoading(true)
            fetchUserGames()
            fetchUserBlogs()
            fetchUserCertificates()
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
                        <Col md={3} lg={3} sm={12} xs={12} className='avatar-col p-5' style={{ display: "flex", alignItems: "center" }}>
                            <div>
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
                            </div>
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
                    <Row>
                        <BlogsSection userBlogs={userBlogs} history={history} />
                    </Row>
                    <Row>
                        {
                            userCertificates.length === 0 ? <h1>No Certificates</h1> :
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <Container
                                        style={{ minHeight: "50vh", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.75)" }}
                                        className='mb-5 p-5'
                                    >
                                        <div style={{ display: "flex", justifyContent: "center" }}><h1 className='text-center mt-1'>My Certificates</h1></div>
                                        <Row className='mt-2'>
                                            {userCertificates.map((certificate) => {
                                                return (
                                                    <Col md={6} lg={6} sm={12} xs={12} className='p-2'>
                                                        <h3 className='cursor' onClick={() => handleCertificateClick(certificate._id)}>* {certificate.title}</h3>
                                                    </Col>
                                                )
                                            })
                                            }
                                        </Row>
                                    </Container>
                                </Col>
                        }
                    </Row>

                </>}
        </Container >
    )
}

export default Profile