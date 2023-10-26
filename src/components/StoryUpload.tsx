import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StoryUpload.css";
import axios from "axios";
import Loading from "./Loading";

interface ChatProps {
	author: string;
	uuid: any;
	name: string;
}

const StoryUpload: FC = () => {
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [filename, setFilename] = useState<string>("");
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loadingMessage, setLoadingMessage] = useState<string>("");
	const navigate = useNavigate();
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

	const getChat = async (book: ChatProps) => {
		axios
			.post(`${BACKEND_URL}/book/${book.uuid}/chat/`, {
				headers: { "Content-Type": "application/json" },
			})
			.then()
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = { name: title, author: author, file };
		setIsLoading(true);
		setLoadingMessage("Reading the story");
		axios
			.post(`${BACKEND_URL}/book/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				const { book, status } = response.data;
				const { author, uuid, name } = book;
				setLoadingMessage("Succesfully read story. Initializing story setting");
				getChat(book);
				setLoadingMessage("Done!");
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
		}
	};

	return isLoading ? (
		<Loading message={loadingMessage} />
	) : (
		<div className="story-upload">
			<div className="stories-header">
				<h1>Upload</h1>
				<div className="back-button">
					<Link to="/stories">Back</Link>
				</div>
			</div>
			<form
				className="story-upload-container"
				onSubmit={(e) => handleSubmit(e)}
			>
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
