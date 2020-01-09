import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Form, Button, Comment } from "semantic-ui-react";

const commentStyle = {
  padding: "5%",
  display: "table"
};

const Chatbox = ({ court, toKebabCase, userId }) => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = room => {
    axios
      .post("/rooms/getMessages", { roomName: room })
      .then(res => {
        const messages = res.data;
        setMessages(messages);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const messageItems = messages.map(message => {
    return (<Comment>
      <Comment.Content>
        <Comment.Author as="a">{message.id}</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>{<p> {message.message} </p>}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>);
  });

  //Subscribe to room
  useEffect(() => {
    const subscribe = async () => {
      const room = await axios.post("/subscribe_to_room", {
        courtName: toKebabCase(court.name),
        userId: userId
      });

      setRoom(room.data);
    };

    if (court && userId) {
      subscribe();
    }
  }, [court, userId]);

  useEffect(() => {
    if (room !== "") {
      fetchMessages(room);
    }
  }, [room]);

  return (
    <div>
      <Comment.Group style={commentStyle}>
        <Header as="h3" dividing>
          {room}
        </Header>

        {messages.length > 0 && (messageItems)}

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default Chatbox;
