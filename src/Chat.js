import { Avatar, Button, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "./Chat.css"
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {
    
    const [input, setInput] = useState("");
    let { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    // console.log("chat was called");

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));
            // console.log("roomId use effect called");

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) =>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
            
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed a message -->", input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }

    // console.log("room name is", roomName)

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar alt="" src="" >{roomName.charAt(0)}</Avatar>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last activity : {" "}{
                        new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                    } </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (

                    <div className={`chat__message ${message.email===user.email && 'chat__reciever'}`}>
                        <div className="chat__messageHeader"><span className="chat__username">{message.name}</span> - <span className="chat__email">{message.email}</span></div>
                        <div className="chat__textContainer">
                        <div className="chat__text">{message.message}.</div>
                        <div className="chat__timeContainer">
                            <div className="chat__timestamp">
                                <span className="">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a messsage"/>
                    <Button className="submitButton__input" onClick={sendMessage} type="submit"></Button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
