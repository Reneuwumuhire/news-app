import sortNewsByImage from "./sortNewsByImage";
import { gql } from "graphql-request";

const fetchNews = async (
	category?: Category | string,
	keywords?: string,
	isDynamic?: boolean,
) => {
	// graphQl query
	const query = gql`
		query MyQuery(
			$access_Key: String!
			$categories: String!
			$keywords: String
		) {
			myQuery(
				access_key: $access_Key
				categories: $categories
				keywords: $keywords
				countries: "gb"
				languages: "en"
			) {
				data {
					author
					category
					country
					description
					image
					language
					published_at
					source
					title
					url
				}
				pagination {
					count
					limit
					offset
					total
				}
			}
		}
	`;
	// fetch function with nextjs.13 caching
	const res = await fetch(
		"https://collingwood.stepzen.net/api/edgy-moose/__graphql",
		{
			method: "POST",
			cache: isDynamic ? "no-cache" : "default",
			next: isDynamic ? { revalidate: 0 } : { revalidate: 300000 },
			headers: {
				"Content-Type": "application/json",
				Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`,
			},
			body: JSON.stringify({
				query,
				variables: {
					access_Key: process.env.MEDIASTACK_API_KEY,
					categories: category,
					keywords: keywords,
				},
			}),
		},
	);
	const newResponse = await res.json();
	const news = sortNewsByImage(newResponse.data?.myQuery);
	return news;
};
export default fetchNews;
// expmple import
