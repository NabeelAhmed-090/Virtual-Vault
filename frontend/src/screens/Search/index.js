import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import SearchGamesDisplayArea from '../../components/SearchGamesDisplayArea'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux'


const Search = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize] = useState(4)
    const [remainingPages, setRemainingPages] = useState(1)
    const [gamesData, setGamesData] = useState([])
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [prevSearch, setPrevSearch] = useState("")
    const [searchSignal, setSearchSignal] = useState(false)

    const handleSearchClick = async (e) => {
        setSearchSignal(!searchSignal)
    }

    useEffect(() => {
        console.log(userInfo)
        const fetchData = async () => {
            try {
                if (prevSearch !== searchText) {
                    setPageNumber(1)
                }
                if (pageNumber > 0 && remainingPages >= 0) {
                    const pageInfo = {
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        searchText: searchText,
                        userId: userInfo._id
                    }
                    setPrevSearch(searchText)
                    const { data } = await axios.post(`http://localhost:5000/api/games/search`, pageInfo)
                    if (data.searchGames.length === 0) {
                        setPageNumber(1)
                        setGamesData([])
                        setRemainingPages(1)
                    } else {
                        setGamesData(data.searchGames)
                        setRemainingPages(data.remainingPages)
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        setLoading(true)
        fetchData()

        return () => {
            setGamesData([])
        }
    }, [pageNumber, searchSignal, userInfo])

    return (
        <div>
            {loading ? <div style={{ height: "100vh" }}>
                <Loader />
            </div> : <>
                <Container className='mt-5'>
                    <Row className='justify-content-center'>
                        <Col md={6} sm={10} lg={6}>
                            <Form>
                                <Form.Control value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ border: "1px solid black" }} />
                            </Form>
                        </Col>
                        <Col md={2} sm={2} lg={2}>
                            <Button variant="dark" className='w-100' type='button' onClick={(e) => handleSearchClick(e)}>
                                <FaSearch />
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {
                    gamesData.length === 0 ? <h1 className='text-center mt-5'>No Game Available</h1> : <SearchGamesDisplayArea gamesData={gamesData} />
                }
                <Container>
                    <Row style={{ display: "flex", justifyContent: "end" }} className='mt-5'>
                        {
                            pageNumber > 1 && (
                                <Col md={3} sm={3} lg={3} style={{ display: "flex", justifyContent: "end" }}>
                                    <Button
                                        variant="dark"
                                        className='w-100'
                                        onClick={() => {
                                            if (pageNumber > 1)
                                                setPageNumber(pageNumber - 1)
                                        }}
                                    >
                                        Previous
                                    </Button>
                                </Col>
                            )
                        }
                        {
                            remainingPages > 0 && (
                                <Col md={3} sm={3} lg={3} style={{ display: "flex", justifyContent: "end" }}>
                                    <Button
                                        variant="dark"
                                        className='w-100'
                                        onClick={() => setPageNumber(pageNumber + 1)}
                                    >
                                        Next
                                    </Button>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </>
            }
        </div >
    )
}

export default Search