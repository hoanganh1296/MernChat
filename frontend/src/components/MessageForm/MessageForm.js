import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '~/context/appContext';
import './messageForm.css';

function MessageForm() {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : '0' + day;

    return `${month}/${day}/${year}`;
  };

  const todayDate = getFormattedDate();
  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages);
  });

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage('');
  };

  return (
    <>
      <div className="messages-output position-relative">
        {user && !privateMemberMsg?._id && (
          <div
            className="alert alert-info position-sticky top-0 start-0 end-0 "
            style={{ zIndex: 100 }}
          >
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div
              className="alert alert-info conversation-info position-sticky top-0 start-0 end-0 "
              style={{ zIndex: 100 }}
            >
              <div>
                Your conversation with {privateMemberMsg.name}
                <img
                  src={privateMemberMsg.picture}
                  alt="member-img"
                  className="conversation-profile-picture"
                />
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}
        {user &&
          messages.map(({ _id: date, messagesByDate }, index) => (
            <div key={index}>
              <p className="alert alert-info text-center message-date-indicator">{date}</p>
              {messagesByDate?.map(({ content, time, from: sender }, index) => (
                <div
                  className={sender?.email === user?.email ? 'message' : 'incoming-message'}
                  key={index}
                >
                  <div className="message-inner">
                    <div className="d-flex align-items-center mb-1">
                      <img src={sender.picture} alt="user-img" className="message-user-pic" />
                      <p className="message-sender">
                        {sender._id === user?._id ? 'You' : sender.name}
                      </p>
                    </div>
                    <p className="message-content">{content}</p>
                    <p className="message-timestamp-left">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef}></div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: '100%', backgroundColor: 'orange' }}
              disabled={!user}
            >
              <i className="fa fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
