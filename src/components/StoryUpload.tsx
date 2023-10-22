import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StoryUpload.css";
import axios from "axios";
import Loading from "./Loading";

const StoryUpload: FC = () => {
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [filename, setFilename] = useState<string>("");
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(file);
		const formData = { name: title, author: author, file };
		console.log(formData);
		setIsLoading(true);

		axios
			.post(`${BACKEND_URL}/book/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				const { book, status } = response.data;
				const { author, uuid, name } = book;

				setIsLoading(false);
				navigate(`/stories/${uuid}`, {
					state: { story: { name: name, uuid: uuid, author: author } },
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setTitle(value);
	};

	const onChangeAuthor = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setAuthor(value);
	};

	const onChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.files;
		if (value !== null) {
			setFilename(value[0]?.name);
			setFile(value[0]);
			console.log(value);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<div className="story-upload">
			<div className="stories-header">
				<h1>Stories</h1>
				<div className="back-button">
					<Link to="/stories">Back</Link>
				</div>
			</div>
			<h4>Upload a story</h4>
			<form
				className="story-upload-container"
				onSubmit={(e) => handleSubmit(e)}
			>
				{/* {success ? <Navigate to="/stories" replace={true} /> : <></>} */}
				<div className="form-item">
					<label>Title: </label>
					<input
						required
						type="text"
						onChange={(e) => onChangeTitle(e)}
					></input>
				</div>
				<div className="form-item">
					<label>Author: </label>
					<input
						required
						type="text"
						onChange={(e) => onChangeAuthor(e)}
					></input>
				</div>
				<label className="upload">
					<input required type="file" onChange={(e) => onChangeFile(e)} />
					<p>{filename ? filename : "Select file"}</p>
				</label>
				<div className="form-item">
					<button>
						<p>Upload</p>
					</button>
				</div>
			</form>
		</div>
	);
};

export default StoryUpload;
