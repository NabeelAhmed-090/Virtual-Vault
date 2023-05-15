import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Col, Dropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Notifications = ({ id }) => {
  let history = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const markNotificationAsRead = async (id) => {
    notifications.forEach((notification) => {
      if (notification.id === id) {
        notification.unread = false;
        unreadCount > 0 && setUnreadCount(unreadCount - 1);
      }
    });
  };

  const handleOnClick = async (link, id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/mark/${id}`);
      markNotificationAsRead(id);
      history(link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/${id}`
        );
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadNotifications);
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => {
      setNotifications([]);
      clearInterval(interval);
    };
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    const dayDiff = Math.floor(timeDiff / 86400000);

    if (dayDiff === 1) {
      return "yesterday";
    } else if (dayDiff === 0) {
      return "today";
    } else {
      return `${dayDiff} days ago`;
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark">
        <FontAwesomeIcon icon={faBell} className="icons" />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {notifications.length !== 0 ? (
          notifications.map((notification) => (
            <Dropdown.Item
              key={notification._id}
              className="cursor"
              onClick={() => handleOnClick(notification.link, notification._id)}
            >
              <Row style={{ width: "32vw" }}>
                <Col md={1} sm={12} lg={1}>
                  <div
                    className="mt-2"
                    style={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      backgroundColor: notification.unread
                        ? "#00006d"
                        : "black",
                    }}
                  ></div>
                </Col>
                <Col md={7} sm={12} lg={7}>
                  <div
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {notification.message}
                  </div>
                </Col>
                <Col md={4} sm={12} lg={4}>
                  {formatDate(notification.createdAt)}
                </Col>
              </Row>
              <hr />
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>
            <Row style={{ width: "32vw" }}>
              <Col className="text-center">
                <h3>No notifications</h3>
              </Col>
            </Row>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notifications;
