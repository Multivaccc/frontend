import React, { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../styles/Story.css";
import axios from "axios";

interface ChatMessage {
	type: "user" | "agent";
	content: string;
	imageURL?: string;
}

const Story: FC = () => {
	let location = useLocation();

	const { story } = location?.state as any;
	const { name, author, uuid } = story;
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

	interface ImageProps {
		imageURL?: string;
	}

	const Image: FC<ImageProps> = (data) => {
		const { imageURL } = data;
		return imageURL === "" ? (
			<></>
		) : (
			<img className="ai-image" src={imageURL} alt="chat setting"></img>
		);
	};

	const Chat = () => {
		const [chat, setChat] = useState<ChatMessage[]>([]);
		const [message, setMessage] = useState<string>("");

		const scrollOptions = {
			duration: 350,
			smooth: true,
			delay: 0,
			isDynamic: true,
		};

		const scrollToBottom = () => {
			scroll.scrollToBottom(scrollOptions);
		};

		const getChat = async () => {
			axios
				.post(`${BACKEND_URL}/book/${uuid}/chat/`, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					setChat(response.data.log);
					scrollToBottom();
				})
				.catch((error) => {
					console.error(error);
				});
		};

		const sendChat = (message: ChatMessage) => {
			const chatData = { chat: message };
			console.log(chatData);
			axios
				.post(`${BACKEND_URL}/book/${uuid}/chat/`, chatData, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					console.log(response);
					setChat(response.data.log);
					scrollToBottom();
				})
				.catch((error) => {
					console.error(error);
				});
		};

		useEffect(() => {
			getChat();
		}, []);

		const handleSendMessage = () => {
			if (message.trim() === "") return;

			const userMessage: ChatMessage = {
				type: "user",
				content: message,
				imageURL: "",
			};
			setMessage("");
			setChat([...chat, userMessage]);
			sendChat(userMessage);
			console.log(chat);
		};

		return (
			<div className="story-chat" id="chat">
				<div className="chat-container">
					{chat.map((message, index) => {
						return message.content !== "_" ? (
							<div
								key={index}
								className={`chat-message 
                ${message.type} 
                ${message.type !== "user" ? " fade-in" : ""}`}
							>
								<Image imageURL={message.imageURL} />
								<p key={index}>{message.content}</p>
							</div>
						) : (
							<></>
						);
					})}
				</div>
				<div className="input-message" id="input">
					<input
						type="text"
						placeholder="Enter text here..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								handleSendMessage();
							}
						}}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className="story">
			<div className="story-header">
				<div className="story-card">
					<h1>{name}</h1>
					<h4>{author}</h4>
				</div>
				<Link to="/stories">Back</Link>
			</div>
			<Chat />
			<div className="story-progress">
				{/* <h1>Progress</h1>
				<h1 style={{ fontSize: "40px" }}>30%</h1> */}
			</div>
		</div>
	);
};

export default Story;
