import React, { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import "../styles/Story.css";

interface ChatMessage {
	type: "user" | "system" | "combined";
	content: (string | JSX.Element)[];
}

const Story: FC = () => {
	const location = useLocation();
	const { story } = location.state as any;
	const { title, author, id } = story;

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
			console.log("We should scroll");
			scroll.scrollToBottom(scrollOptions);
		};

		useEffect(() => {
			const firstMessage: ChatMessage = {
				type: "system",
				content: ["Welcome to " + title],
			};
			addRandomResponse(firstMessage);
		}, []);

		const addRandomResponse = (userMessage?: ChatMessage) => {
			const randomResponse =
				chatData[Math.floor(Math.random() * chatData.length)];

			if (userMessage) {
				setChat([...chat, userMessage, randomResponse]);
			} else {
				setChat([...chat, randomResponse]);
			}
		};

		const handleSendMessage = () => {
			if (message.trim() === "") return;

			const userMessage: ChatMessage = { type: "user", content: [message] };
			setMessage("");
			setChat([...chat, userMessage]);

			setTimeout(() => {
				addRandomResponse(userMessage);
				scrollToBottom();
			}, 800);
		};

		return (
			<div className="story-chat" id="chat">
				<div className="chat-container">
					{chat.map((message, index) => (
						<div
							key={index}
							className={`chat-message 
                ${message.type} 
                ${message.type !== "user" ? " fade-in" : ""}`}
						>
							{message.content.map((content, i) => (
								<div key={i} className="chat-content">
									{typeof content === "string" ? (
										<p key={index}>{content}</p>
									) : (
										content
									)}
								</div>
							))}
						</div>
					))}
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
					<h1>{title}</h1>
					<h4>{author}</h4>
				</div>
				<Link to="/stories">Back</Link>
			</div>
			<Chat />
			<div className="story-progress">
				<h1>Progress</h1>
				<h1 style={{ fontSize: "40px" }}>30%</h1>
			</div>
		</div>
	);
};

export default Story;

// Define your chat data
const chatData: ChatMessage[] = [
	{
		type: "combined",
		content: [
			"Would you like to enter The Veldt?",
			<img
				src="https://images.squarespace-cdn.com/content/v1/557b6333e4b020deb8dc768c/1589939070426-DF5EC7MZ377S6TOJ5Y8F/Inspirational-retro-futuristic-living-room-ideas_3.jpg"
				alt="The Nursery"
			/>,
		],
	},
	{
		type: "combined",
		content: [
			<img
				src="https://ficinc.com/wp-content/uploads/veldt-annd-banks-adaptability.jpg"
				alt="The Veldt"
			/>,
			"You enter the nursery. The hot straw smell of lion grass surrounds you. In the distance, lions feed on a fresh zebra kill. Lydia is distressed, insisting the projections have become too realistic.",
		],
	},
	{
		type: "system",
		content: [
			"Now the hidden odorophonics were beginning to blow a wind of odor at the two people in the middle of the baked veldtland.\n\n The hot straw smell of lion grass, the cool green smell of the hidden water hole, the great rusty smell of animals, the smell of dust like a red paprika in the hot air. \n\n And now the sounds: the thump of distant antelope feet on grassy sod, the papery rustling of vultures. A shadow passed through the sky. The shadow flickered on George Hadley’s upturned, sweating face. “Filthy creatures,” he heard his wife say.",
		],
	},
];
