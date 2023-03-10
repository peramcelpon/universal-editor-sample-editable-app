import Head from "next/head";
import "../styles/globals.scss";
import {TimelineAnimationWrapper} from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function MyApp({Component, pageProps}) {
	const router = useRouter();
	const [author, setAuthor] = useState();

	useEffect(() => {
		setAuthor(router.query["authorHost"]);
	},[router.query])


	return (
		<>
			<Head>
				<title>Sparkle Demo</title>
					<meta name="urn:auecon:aem" content={author ? `aem:${author}` : ''}/>
			</Head>

			<ResizeProvider>
				<TimelineAnimationWrapper>
					<Component {...pageProps} />
				</TimelineAnimationWrapper>
			</ResizeProvider>
		</>
	);
}

export default MyApp;
