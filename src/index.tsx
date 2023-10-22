import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Stories from "./components/Stories";
import Story from "./components/Story";
import StoryUpload from "./components/StoryUpload";
import "./index.css";

const myRouter = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/upload",
		element: <StoryUpload />,
	},
	{
		path: "/stories",
		element: <Stories />,
	},
	{
		path: "/stories/:id",
		element: <Story />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RouterProvider router={myRouter} />
);
