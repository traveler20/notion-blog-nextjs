import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
	return (
		<div>
			<Head>
				<title>traveler20's Notion</title>
				<link
					rel="icon"
					href="https://traveler20.site/asset/img/meta/favicon.ico"
				/>
			</Head>

			<header class={styles.header}>
				<div class={styles.header__inner}>
					<Link href="/">
						<a class={styles.header__logo}>
							<img
								src="https://traveler20.github.io/asset/img/meta/logo-icon.svg"
								alt=""
							/>
						</a>
					</Link>
					<div class={styles.header__mode}></div>
				</div>
			</header>
			<main className={styles.container}>
				<header className={styles.top_header}>
					<h1>traveler20's Notion</h1>
					<p>
						traveler20のNotionブログです。<br></br>{" "}
						<a href={`https://traveler20.site/`}>traveler20.site</a>
						<br></br> <a href="https://github.com/traveler20">Github</a>
					</p>
				</header>

				<h2 className={styles.heading}>記事一覧</h2>
				<ol className={styles.posts}>
					{posts.map((post) => {
						const date = new Date(post.last_edited_time).toLocaleString(
							"en-US",
							{
								month: "short",
								day: "2-digit",
								year: "numeric",
							}
						);
						return (
							<li key={post.id} className={styles.post}>
								<Link href={`/${post.id}`}>
									<a>
										<h3 className={styles.postTitle}>
											<Text text={post.properties.Name.title} />
										</h3>
										{/* <p className={styles.postDescription}>{date}</p> */}
										Read post →
									</a>
								</Link>
							</li>
						);
					})}
				</ol>
			</main>
			<footer className={styles.footer}>
				<small className={styles.footerSmall}>traveler20's Notion</small>
			</footer>
		</div>
	);
}

export const getStaticProps = async () => {
	const database = await getDatabase(databaseId);

	return {
		props: {
			posts: database,
		},
		revalidate: 1,
	};
};
