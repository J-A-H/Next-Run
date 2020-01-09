import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Form, Button, Comment } from "semantic-ui-react";

//PUSHER________________
const Pusher = require("pusher-js");

const pusherObject = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  disableStats: true
});

//CSS

const commentStyle = {
  padding: "5%",
  display: "table"
};

const Chatbox = ({ court, toKebabCase, userId }) => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messageItems = messages.map(message => {
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as="a">{`Random`}</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <Comment.Text><p> {message} </p></Comment.Text>
        </Comment.Content>
      </Comment>
    );
  });

  const onTextChange = e => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (newMessage !== "") {
      axios
        .post("/chat/send", {
          message: newMessage,
          channel: `${toKebabCase(court.name)}-chat`
        })
        .then(res => {
          const newStr = "";
          setNewMessage(newStr);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //* Subscribe chat channel for court
  useEffect(() => {
    /**
     * Subscribes to Court chat and listens for incoming messages
     */
    const handelIncomingMessage = data => {
      console.log(data.incomingMessage);
      const newMessagesArr = messages;
      newMessagesArr.push(data.incomingMessage);
      setMessages(newMessagesArr);
    };

    console.log(court);

    if (court !== undefined) {

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


  console.log('messageItems', messageItems);

  return (
    <div>
      <Comment.Group style={commentStyle}>
        <Header as="h3" dividing>
          {room}
        </Header>

        {messages.length > 0 && messageItems}

        <Form reply onSubmit={sendMessage}>
          <Form.TextArea type="text" onChange={onTextChange} />
          <Button
            content="Add Reply"
            labelPosition="left"
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
