import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Header, Form, Button, Comment, Segment } from "semantic-ui-react";
import '../CourtCard.css'
import helpers from "../../helpers/helpers";

//PUSHER________________
const Pusher = require("pusher-js");

const pusherObject = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  disableStats: true
});

//* Functions
const Chatbox = ({
  court,
  toKebabCase,
  allMessages,
  addMessageToAllMessages
}) => {
  const [room, setRoom] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { getTimeStamp } = helpers();

  const onTextChange = e => {
    
    e.preventDefault();
    setNewMessage(e.target.value);

  };

  const sendMessage = () => {

    if (newMessage !== "") {
      axios.post("/chat/send", {
        message: newMessage,
        channel: `${toKebabCase(court.name)}-chat`,
        court_id: court.id
      });
    }
  };

  //* Use Effect

  //* Subscribe chat channel for court
  useEffect(() => {
    /**
     * Subscribes to Court chat and listens for incoming messages
     */
    const handelIncomingMessage = data => {
      const currentTime = Date.now();

      const timeStamp = getTimeStamp(currentTime);

      addMessageToAllMessages({
        message: data.incomingMessage,
        time: timeStamp
      });
    };

    if (court !== undefined) {
      axios
        .get(`/chat/getMessages/${court.id}`)
        .then(res => {
          const incomingMessagesArray = res.data;

          incomingMessagesArray.reverse().forEach(obj => {
            addMessageToAllMessages({
              message: obj.content,
              time: getTimeStamp(obj.times_stamp)
            });
          });
        })
        .catch(err => {
          console.log(`Query Error`);
        });

      setRoom(court.name);
      const courtChatChannel = pusherObject.subscribe(
        `${toKebabCase(court.name)}-chat`
      );
      courtChatChannel.bind("message", handelIncomingMessage);

      return () => {
        courtChatChannel.unbind("message", handelIncomingMessage);
      };
    }
  }, [court]);

  useEffect(scrollToBottom, [allMessages]);

  //*Sub Components
  const messageItems = allMessages.map((message, index) => {
    return (
      <Comment key={index}>
        <Comment.Content>
          <Comment.Author as="a">{`Random`}</Comment.Author>
          <Comment.Metadata>
            <div> {message.time}</div>
          </Comment.Metadata>
          <Comment.Text>
            <p> {message.message} </p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  });

  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          {room}
        </Header>

        <div className="Chat-history-box">
          {allMessages.length > 0 && messageItems}
          <div ref={messagesEndRef} />
        </div>

        <Form reply onSubmit={sendMessage}>
          <Form.TextArea
            type="text"
            onChange={onTextChange}
            style={{ 
              height: 55,
            }}
          />
          <Button
            content="Send"
            labelPosition="right"
            icon="edit"
            primary
            type="submit"
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default Chatbox;
