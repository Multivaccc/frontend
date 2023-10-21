import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Stories.css";

type Title = string;
type Author = string;
type ID = string;

type Story = {
	title: Title;
	author: Author;
	id: ID;
}

const Home: FC = () => {

	
const stories: Story[] = [{
						    title: "A Scandal in Bohemia",
						    author: "Sir Arthur Conan Doyle",
						    id: "1",
						  },{
						    title: "The Veldt",
						    author: "Ray Bradbury",
						    id: "2",
						  },{
						    title: "The Call of Cthulhu",
						    author: "H.P. Lovecraft",
						    id: "3",
						  },{
						    title: "The Lottery",
						    author: "Shirley Jackson",
						    id: "4",
						  },{
						    title: "The Tell-Tale Heart",
						    author: "Edgar Allan Poe",
						    id: "5",
						  },{
						    title: "The War of the Worlds",
						    author: "H.G. Wells",
						    id: "6",
						  },{
						    title: "The Yellow Wallpaper",
						    author: "Charlotte Perkins Gilman",
						    id: "7",
						  },{
						    title: "The Metamorphosis",
						    author: "Franz Kafka",
						    id: "8",
						  },{
						    title: "I, Robot",
						    author: "Isaac Asimov",
						    id: "9",
						  },{
						    title: "Fahrenheit 451",
						    author: "Ray Bradbury",
						    id: "10",
						  }];

	return (
		<div className="stories">
			<div className="stories-header">
				<h1>Stories</h1>
				<Link to="/">Back</Link>
			</div>
			<div className="stories-container">
				{stories.map((story : Story, id : number) =>
					{
						return (
							<div className="story-link" key= {id}> 
								<Link to={"/stories/"+story.id} state={{story : story}}>
									{story.title}
								</Link>
								<p>- {story.author}</p>
							</div>	
						)
					})
				}

			</div>
		</div>
	);
};

export default Home;
