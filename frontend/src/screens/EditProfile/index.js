import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import Loader from '../../components/Loader'
import './index.css'
import ErrorToaster from '../../components/ErrorToaster'


const EditProfile = () => {

    const [type, setType] = useState(true)
    const [validated, setValidated] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [password, setPassword] = useState("")

    let history = useNavigate()
    let dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails
    const detailsLoading = userDetails.loading

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading, error, success } = userUpdateProfile

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isValidFirstName, setIsValidFirstName] = useState(true)
    const [isValidLastName, setIsValidLastName] = useState(true)
    const [isValidCityName, setIsValidCityName] = useState(true)

    const resetForm = () => {
        setEmail(user.email)
        setUserName(user.userName)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setCity(user.city)
    }


    const handleNameChange = (e, setName, setIsValidName) => {
        const enteredValue = e.target.value;
        const regex = /^[A-Za-z]+$/; // Regular expression for alphabets only

        if (enteredValue === '' || regex.test(enteredValue)) {
            setName(enteredValue);
            setIsValidName(true);
        } else {
            setIsValidName(false);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                setRequestLoading(true)
                dispatch(updateUserProfile({
                    id: user._id,
                    email,
                    userName,
                    firstName,
                    lastName,
                    city,
                    password
                }))
            } catch (error) {
                resetForm()
            } finally {
                setRequestLoading(false)
            }
        }
        setValidated(true);
    };

    useEffect(() => {
        if (!userInfo) {
            history("/")
        } else {
            if (!user || !user.email) {
                dispatch(getUserDetails('profile', userInfo))
            } else {
                resetForm()
            }
        }
    }, [dispatch, history, userInfo, user])


    return (
        <Container style={{ minHeight: "100vh" }}>
            <div className={loading || detailsLoading || requestLoading ? 'temp-height' : ''}>
                {(loading || detailsLoading) ? <Loader message={"Loading"} /> : <>
                    <Row className='mt-5'>
                        <Col md={12} sm={12} lg={12}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationEmailProfile">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className={'shadow-none'}
                                            disabled
                                            type="email"
                                            placeholder="enter email"
                                            defaultValue={email}
                                            onBlur={(e) => setEmail(e.target.value)}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Valid email is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationUsernameProfile">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="usernamePrepend"><b>@</b></InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="usernamePrepend"
                                                disabled
                                                defaultValue={userName}
                                                onBlur={(e) => setUserName(e.target.value)}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type="text"
                                            placeholder="Enter first name"
                                            value={firstName}
                                            onChange={(e) => handleNameChange(e, setFirstName, setIsValidFirstName)}
                                            isInvalid={!isValidFirstName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            First name is required and should contain only alphabets.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type="text"
                                            placeholder="enter last name"
                                            value={lastName}
                                            onChange={(e) => handleNameChange(e, setLastName, setIsValidLastName)}
                                            isInvalid={!isValidLastName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Last name is required and should contain only alphabets.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            className={'shadow-none'}
                                            required
                                            type="text"
                                            placeholder="enter city"
                                            value={city}
                                            onChange={(e) => handleNameChange(e, setCity, setIsValidCityName)}
                                            isInvalid={!isValidCityName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            City is required and should contain only alphabets.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationPasswordSignup">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                className={'shadow-none'}
                                                type={type ? "password" : "text"}
                                                placeholder="password"
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <InputGroup.Text id="inputGroupPrepend" className='cursor' onClick={() => setType(prev => !prev)}>
                                                <FontAwesomeIcon icon={type ? faEye : faEyeSlash} />
                                            </InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number ,and one special character).
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col className='update-button'>
                                        <Button type="submit" variant="dark" className='mt-3'>Update Profile</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <ErrorToaster display={!!error} message={(error && error.includes("500") === true) ? "Unable to connect to server" : `${error}`} />
                    <ErrorToaster display={!!success} error={false} message={'Profile Updated'} />
                </>
                }
            </div>
        </Container>
    )
}

export default EditProfile