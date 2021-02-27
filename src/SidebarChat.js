import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import "./SidebarChat.css"

function SidebarChat({id, name, addNewChat }) {
    
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [id]);


    const createChat = () => {
        const roomName = prompt("Please enter a name for the new chat room.");
        

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    }; 
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`} className="sidebarChat__link">
            <div className="sidebar-chat">
                <Avatar alt="" src="" >{name.charAt(0)}</Avatar>
                <div className="sidebar-chat-info">
                    <h2>{name}</h2>
                    <p> {messages[0]?.message.substr(0, 35)} </p>
                    <div className="bottom-border-hr"></div>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebar-chat">
            <h3>Create a chat room</h3>            
        </div>
    );
}

export default SidebarChat
