import React, { useEffect, useState } from 'react'
import "./Sidebar.css"



import { Avatar, IconButton } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { MoreHoriz } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
// import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Create, SearchOutlined } from '@material-ui/icons';

import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => (
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),    
            })))
        ))

        return () => {
            unsubscribe();
        };
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter a name for the new chat room.");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    };

    // console.log("Sidebar was called")
    
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar className="avatar" src={user?.photoURL}></Avatar>
                <div className="sidebar-header-right">
                    <IconButton onClick={createChat}>
                        <Create />
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton onClick={createChat}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="search-container">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
