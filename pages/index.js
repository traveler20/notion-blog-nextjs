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
				<title>traveler20 - コーディングが強みのWEBデザイナー</title>
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
				<figure className={styles.top_figure}>
					<picture>
						<img
							src="https://avatars.githubusercontent.com/u/60683849?v=4"
							alt="traveler20"
							loading="lazy"
						/>
					</picture>
					<figcaption>
						<h1 className={styles.top_figure_heading}>traveler20</h1>
						<a
							href="https://github.com/traveler20"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							GitHub
						</a>
					</figcaption>
				</figure>

				<h2 className={styles.heading}>制作実績の一覧</h2>
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
										<div className={styles.postRead}>詳細ページ →</div>
									</a>
								</Link>
							</li>
						);
					})}
				</ol>
			</main>
			<footer className={styles.footer}>
				<small className={styles.footerSmall}>
					&copy;&nbsp;2022&nbsp;traveler20.
				</small>
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
