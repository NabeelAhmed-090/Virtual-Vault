import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Col, Dropdown, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ id }) => {

    let history = useNavigate()

    const [notifications, setNotifications] = useState([])

    const handleOnClick = (link) => {
        history(link)
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/notifications/${id}`)
                const data = await res.json()
                console.log(data)
                setNotifications(data.notifications)
            } catch (error) {
                console.log(error)
            }
        }

        fetchNotifications()
        return () => {
            setNotifications([])
        }

    }, [])
    const unreadCount = 2

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
                <FontAwesomeIcon icon={faBell} className='icons' />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notifications.map((notification) => (
                    <Dropdown.Item key={notification.id} className='cursor' onClick={() => handleOnClick(notification.link)}>
                        <Row style={{ width: "32vw" }}>
                            <Col md={1} sm={12} lg={1}>
                                <div
                                    className='mt-2'
                                    style={{
                                        height: "10px",
                                        width: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: notification.unread ? "#00006d" : "black",
                                    }}></div>
                            </Col>
                            <Col md={7} sm={12} lg={7}>
                                <div
                                    style={{
                                        width: "100%",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
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
                ))}
            </Dropdown.Menu>
        </Dropdown >
    )
}


export default Notifications