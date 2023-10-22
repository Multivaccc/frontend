import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Stories.css";

type Story = {
	uuid: any;
	name: string;
	author: string;
};

const Home: FC = () => {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
	const [stories, setStories] = useState<Story[]>([]);

	const getStories = async () => {
		const response = await fetch(`${BACKEND_URL}/book/all/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		const { books, status } = data;
		if (status !== 200) {
			console.error(status);
		} else {
			setStories(books);
		}
	};

	useEffect(() => {
		getStories();
	}, []);

	return (
		<div className="stories">
			<div className="stories-header">
				<h1>Stories</h1>
				<div className="back-button">
					<Link to="/" className="back-button">
						Back
					</Link>
				</div>
			</div>
			<div className="stories-container">
				{stories.length ? (
					stories.map((story: Story, id: number) => {
						return (
							<div className="story-link" key={id}>
								<Link to={"/stories/" + story.uuid} state={{ story: story }}>
									{story.name}
								</Link>
								<p>- {story.author}</p>
							</div>
						);
					})
				) : (
					<></>
				)}
				<div className="story-link">
					<div className="upload-button">
						<Link to="/upload">
							<p>Add a Story</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
