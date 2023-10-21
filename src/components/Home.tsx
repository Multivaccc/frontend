import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: FC = () => {
	return (
		<div className="home">
			<div className="home-header">
				<h1>MULTIVAC</h1>
				<h4>Multimedia Visual Adventure Console </h4>
			</div>
			<div className="explore-button">
				<Link to="/stories">EXPLORE</Link>
			</div>
		</div>
	);
};

export default Home;
