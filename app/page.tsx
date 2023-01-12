import React from "react";
import { categories } from "../constant";
import fetchNews from "../lib/fetchNews";
import NewsList from "./NewsList";
// import response from "../response.json";
async function HomePage() {
	// fetch the news data
	const news: NewsResponse = await fetchNews(categories.join(","));
	return (
		<div>
			<NewsList news={news} />
		</div>
	);
}

export default HomePage;