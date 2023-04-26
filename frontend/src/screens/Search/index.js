import React, { useEffect, useState } from 'react'
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
    const [pageSize] = useState(2)
    const [remainingPages, setRemainingPages] = useState(1)
    const [gamesData, setGamesData] = useState([])
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [prevSearch, setPrevSearch] = useState("")
    const [searchSignal, setSearchSignal] = useState(false)

    const [possibleTags] = useState(["action", "thriller", "combat", "adventure", "strategy", "simulation", "sports", "racing", "puzzle", "arcade", "platformer", "shooter", "fighting", "stealth", "survival", "horror", "battle royale", "role-playing", "mmo", "open world"]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [isSearching, setIsSearching] = useState(true)

    const handleTagSelect = (e) => {
        const value = e.target.value;
        if (selectedTags.length >= 5) {
            return;
        }
        setSelectedTags([...selectedTags, value]);
    };

    const handleSearchClick = async (e) => {
        setSearchSignal(!searchSignal)
    }

    const handleTagDeselect = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

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
                        userId: userInfo._id,
                        isSearching: isSearching,
                        tags: selectedTags
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
                {
                    isSearching ? (
                        <Container className='mt-5'>
                            <Row className='justify-content-center'>
                                <Col md={6} sm={12} lg={6} className='mt-2'>
                                    <Form>
                                        <Form.Control className={'shadow-none'} value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ border: "1px solid black" }} />
                                    </Form>
                                </Col>
                                <Col md={2} sm={6} lg={2} xs={6} className='mt-2'>
                                    <Button variant="dark" className='w-100' type='button' onClick={(e) => handleSearchClick(e)}>
                                        <FaSearch />
                                    </Button>
                                </Col>
                                <Col md={2} sm={6} lg={2} xs={6} className='mt-2'>
                                    <Button variant="dark" className='w-100' type='button' onClick={() => setIsSearching(false)}>
                                        Filter
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        <Container className='mt-5'>
                            <Row className='mt-3'>
                                <Col md={12} sm={12} lg={12}
                                    style={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
                                    {
                                        selectedTags.map(tag => {
                                            return (
                                                <div
                                                    style={{
                                                        height: "50px",
                                                        width: "100px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => handleTagDeselect(tag)}
                                                    key={`selected ${tag}`}
                                                >
                                                    <p style={{ fontSize: "10px" }} className='mt-3'>{tag}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                            <Row className='justify-content-center align-items-center mt-2'>
                                <Col md={12} sm={12} lg={12}>
                                    <Form.Group controlId="tag-selector">
                                        <Form.Label>Select Upto 5 tags</Form.Label>
                                        <Form.Select className={'shadow-none'} multiple onChange={handleTagSelect}>
                                            {possibleTags.map((tag) => (
                                                <option
                                                    style={{ cursor: "pointer" }}
                                                    className={selectedTags.includes(tag) ? "selected-tag" : ""}
                                                    key={tag}
                                                    value={tag}
                                                    disabled={selectedTags.includes(tag)}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='justify-content-end'>
                                <Col md={2} sm={6} lg={2} xs={6} className='mt-2'>
                                    <Button variant="dark" className='w-100' type='button' onClick={(e) => handleSearchClick(e)}>
                                        <FaSearch />
                                    </Button>
                                </Col>
                                <Col md={2} sm={6} lg={2} xs={6} className='mt-2'>
                                    <Button variant="dark" className='w-100' type='button' onClick={() => setIsSearching(true)}>
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
                {
                    gamesData.length === 0 ? <h1 className='text-center mt-5'>No Game Available</h1> : <SearchGamesDisplayArea gamesData={gamesData} />
                }
                <Container>
                    <Row style={{ display: "flex", justifyContent: "end" }} className='mt-5'>
                        {
                            pageNumber > 1 && (
                                <Col md={3} sm={6} lg={3} xs={6} style={{ display: "flex", justifyContent: "end" }}>
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
                                <Col md={3} sm={6} lg={3} xs={6} style={{ display: "flex", justifyContent: "end" }}>
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