import React from "react";
import "../styles/Loading.css";
import { ThreeDots } from "react-loader-spinner";

interface LoadingProps {
	message?: string;
}
export default function Loading(data: LoadingProps) {
	return (
		<div className="loading-page">
			<div id="loading-icon">
				<ThreeDots
					height={80}
					width={80}
					radius={9}
					color="black"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</div>
			<p>{data.message ? data.message : "No loading message!"}</p>
		</div>
	);
}
