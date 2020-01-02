import React, { Fragment } from "react";

const CourtChatShow = () => {
  const tokenProvider = new Chatkit.TokenProvider({
    url: "YOUR TEST TOKEN ENDPOINT"
  });
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: "YOUR INSTANCE LOCATOR",
    userId: "YOUR USER ID",
    tokenProvider: tokenProvider
  });

  chatManager
    .connect()
    .then(currentUser => {
      currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: message => {
            const ul = document.getElementById("message-list");
            const li = document.createElement("li");
            li.appendChild(
              document.createTextNode(
                `${message.senderId}: ${
                  // We know our message will have a single part with
                  // a plain text content because we used
                  // sendSimpleMessage. In general we'd have to check
                  // the partType here.
                  message.parts[0].payload.content
                }`
              )
            );
            ul.appendChild(li);
          }
        }
      });

      const form = document.getElementById("message-form");
      form.addEventListener("submit", e => {
        e.preventDefault();
        const input = document.getElementById("message-text");
        currentUser.sendSimpleMessage({
          text: input.value,
          roomId: currentUser.rooms[0].id
        });
        input.value = "";
      });
    })
    .catch(error => {
      console.error("error:", error);
    });
  return (
    <Fragment>
      <ul id="message-list"></ul>
      <form id="message-form">
        <input type="text" id="message-text" />
        <input type="submit" />
      </form>
    </Fragment>
  );
};

export default CourtChatShow;
