import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { getUserDetails } from "../../actions/userActions";
import Loader from "../../components/Loader";
import GameInfoSection from "./GameInfoSection";
import ExistingGameSection from "./ExistingGamesSection";
import BlogsSection from "./BlogsSecton";
import CertificateSection from "./CertificateSection";
import "./index.css";

const Profile = () => {
  const UPLOAD = "UPLOAD";
  const CERTIFICATES = "CERTIFICATES";
  const BLOGS = "BLOGS";
  const GAMES = "GAMES";

  let history = useNavigate();
  let dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [gameFetchLoading, setGameFetchLoading] = useState(false);
  const [display, setDisplay] = useState(UPLOAD);
  const [userGames, setUserGames] = useState([{}]);
  const [userBlogs, setUserBlogs] = useState([{}]);
  const [userCertificates, setUserCertificates] = useState([{}]);

  const initials = userName.charAt(0).toUpperCase();

  const setInfo = () => {
    setEmail(user.email);
    setUserName(user.userName);
    setCity(user.city);
  };

  useEffect(() => {
    const fetchUserGames = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/games/user_games/${userInfo._id}`
      );
      setUserGames(data.userGames);
      setGameFetchLoading(false);
    };
    const fetchUserBlogs = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/blogs/user_blogs/${userInfo._id}`
      );
      setUserBlogs(data.blogs);
    };
    const fetchUserCertificates = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/certificate/user_certificates/${userInfo._id}`
      );
      setUserCertificates(data.certificates);
    };
    if (!userInfo) {
      history("/");
    } else {
      setGameFetchLoading(true);
      fetchUserGames();
      fetchUserBlogs();
      fetchUserCertificates();
      if (!user || !user.email) {
        dispatch(getUserDetails("profile", userInfo));
      } else {
        setInfo();
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <Container>
      {loading || gameFetchLoading ? (
        <div style={{ height: "100vh" }}>
          <Loader message={"Loading"} />{" "}
        </div>
      ) : (
        <Container className="avatar-col p-5 mt-5">
          <Row className="d-flex justify-content-center">
            <Col md={4} lg={4} sm={12} xs={12} style={{ height: "35vh" }}>
              <Badge
                bg="dark"
                className="w-100 initials-badge rounded-circle avatar-style"
              >
                {initials}
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <h4 className="text-center">{userName}</h4>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <h6 className="text-center">{email}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <h6 className="text-center">{city}</h6>
            </Col>
          </Row>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Row className="mb-2 mt-2 p-2 w-100 d-flex justify-content-center">
              <Col md={4} lg={4} sm={12}>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/profile/edit"
                >
                  <Button className="w-100" variant="dark">
                    Edit Profile
                  </Button>
                </a>
              </Col>
            </Row>
            <Row className="w-100 mt-2">
              <Col md={3} lg={3} sm={12} className="mt-3">
                <Button
                  className="w-100"
                  variant="dark"
                  onClick={() => setDisplay(UPLOAD)}
                >
                  Upload New Game
                </Button>
              </Col>
              <Col md={3} lg={3} sm={12} className="mt-3">
                <Button
                  className="w-100"
                  variant="dark"
                  onClick={() => setDisplay(GAMES)}
                >
                  View My Games
                </Button>
              </Col>
              <Col md={3} lg={3} sm={12} className="mt-3">
                <Button
                  className="w-100"
                  variant="dark"
                  onClick={() => setDisplay(BLOGS)}
                >
                  View My Blogs
                </Button>
              </Col>
              <Col md={3} lg={3} sm={12} className="mt-3">
                <Button
                  className="w-100"
                  variant="dark"
                  onClick={() => setDisplay(CERTIFICATES)}
                >
                  View My Certificates
                </Button>
              </Col>
            </Row>
          </div>
          {display === UPLOAD && (
            <Row className="mt-5">
              <Col md={12} lg={12} sm={12} xs={12}>
                <GameInfoSection
                  id={userInfo._id}
                  setUserGames={setUserGames}
                />
              </Col>
            </Row>
          )}
          {display === GAMES && (
            <Row className="mt-5 w-100">
              <Col md={12} lg={12} sm={12} xs={12}>
                <ExistingGameSection
                  userGames={userGames}
                  setUserGames={setUserGames}
                />
              </Col>
            </Row>
          )}
          {display === BLOGS && (
            <Row className="mt-5">
              <Col md={12} lg={12} sm={12} xs={12}>
                {userBlogs.length !== 0 ? (
                  <BlogsSection userBlogs={userBlogs} history={history} />
                ) : (
                  <h4 className="text-center">No Blogs Found</h4>
                )}
              </Col>
            </Row>
          )}
          {display === CERTIFICATES && (
            <Row className="mt-5">
              <Col md={12} lg={12} sm={12} xs={12}>
                {userCertificates.length !== 0 ? (
                  <CertificateSection userCertificates={userCertificates} />
                ) : (
                  <h4 className="text-center">No Certificates Found</h4>
                )}
              </Col>
            </Row>
          )}
        </Container>
      )}
    </Container>
  );
};

export default Profile;
