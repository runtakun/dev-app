import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp-analytics'
import { header } from '../template/header'
import { button } from '../template/button'
import { footer } from '../template/footer'
import { large } from '../style/large'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	content: 'content',
	heading: 'heading',
	downloads: 'downloads',
	features: 'features',
	exchange: 'exchange',
	button: 'button'
}

export const root = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡>
		${await head({
			title: '',
			description: '',
			url: {
				host: config.domain,
				path: request.url
			},
			injection: await style`
			body {
				background: black;
				color: white;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			a {
				color: white;
			}
			h1,
			h2,
			p {
				margin: 0;
			}
			h1,
			h2 {
				margin-bottom: 3rem;
			}
			h2 {
				font-weight: normal
			}
			main {
				display: grid;
				grid-gap: 2rem;
				justify-content: stretch;
				justify-items: center;
				${large(`
					grid-gap: 5rem;
				`)}
			}
			section {
				display: grid;
				width: 100%;
				max-width: 1600px;
				padding: 3rem 0;
				align-items: start;
				${large(`
					grid-auto-flow: column;
				`)}
			}
			figure {
				margin: 0;
			}
			.${classNames.content} {
				display: grid;
				grid-gap: 1rem;
				padding: 2rem;
				box-sizing: border-box;
				max-width: 450px;
				justify-items: center;
				${large(`
					justify-items: start;
				`)}
			}
			.${classNames.button} {
				margin-top: 2rem;
				${large(`
					margin-top: 3rem;
				`)}
			}
			.${classNames.heading} {
				grid-template-areas:
					'figure'
					'content';
				${large(`
					grid-template-areas: 'content figure';
					grid-template-columns: auto 1fr;
					`)}
				& .${classNames.content} {
					grid-area: content;
				}
				& figure {
					grid-area: figure;
				}
				& .${classNames.button} {
					justify-self: normal;
					text-align: center;
					font-weight: bold;
					background-image: linear-gradient(120deg, #00ebff, #f200df 35%, #ff4700);
				}
				h1 {
					font-size: 2rem;
					${large(`
						font-size: 3rem;
					`)}
				}
			}
			.${classNames.downloads} {
				justify-content: center;
				${large(`
					grid-template-columns: 1fr 50%;
				`)}
				&__strong {
					font-weight: bolder;
					color: #FFC107;
				}
				figure {
					padding: 2rem;
					${large(`
						padding: 5rem;
					`)}
				}
			}
			.${classNames.exchange} {
				align-items: center;
				grid-gap: 5rem;
				justify-content: center;
				justify-items: center;
				${large(`
					grid-gap: 10rem;
					padding: 10rem 0;
				`)}
				h2 {
					margin: 0;
				}
				a {
					display: grid;
					grid-gap: 1rem;
					grid-auto-flow: column;
					align-items: center;
					text-decoration: none;
					amp-img {
						width: 100px;
					}
					span {
						font-size: 2rem;
					}
				}
			}
			.${classNames.features} {
				justify-content: center;
				p {
					font-size: 1.2rem;
					${large(`
						font-size: 1.6rem;
					`)}
					&::before {
						content: '';
						display: inline-block;
						width: 0.6em;
						height: 0.6em;
						background: #E91E63;
						border-radius: 50%;
						margin-right: 1rem;
					}
				}
				& .${classNames.content} {
					max-width: inherit;
					justify-items: baseline;

				}
			}
		`
		})}
		<body>
			${await ampAnalytics()} ${await header()}
			<main>
				<section class="${classNames.heading}">
					<div class="${classNames.content}">
						<h1>Code as Life</h1>
						<p>Dev is a token for OSS sustainability.</p>
						<p>Dev monetizes open source right now.</p>
						<p>
							Anyone can start without changing licenses, codes, and support.
						</p>
						<p>Just publish your open source to npm.</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'Start Now',
							className: classNames.button
						})}
					</div>
					<figure>
						<amp-img alt='image'
							src=//asset.devtoken.rocks/lp/cover.png
							width=2000
							height=1177
							layout=responsive>
						</amp-img>
					</figure>
				</section>
				<section class="${classNames.downloads}">
					<figure>
						<amp-img alt='image'
							src=//asset.devtoken.rocks/lp/chart/2018-12.png
							width=2212
							height=1296
							layout=responsive>
						</amp-img>
					</figure>
					<div class="${classNames.content}">
						<h2>OSS Downloads</h2>
						<p>OSS registered to Dev is downloaded over an average of <span class="${
							classNames.downloads
						}__strong">428 million</span> on average every month.</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'Lean More',
							className: classNames.button
						})}
					</div>
				</section>
				<section class="${classNames.features}">
					<div class="${classNames.content}">
						<h2>Features</h2>
						<p>Support open source project</p>
						<p>Find an influential open source project</p>
						<p>Receive rewards for contributions and activities</p>
					</div>
				</section>
				<section class="${classNames.exchange}">
					<h2>Exchange</h2>
					<a href="//etherdelta.com/#0x98626e2c9231f03504273d55f397409defd4a093-ETH" target="_blank" rel="noopener">
						<amp-img alt='EtherDelta'
							src=//asset.devtoken.rocks/etherdelta.svg
							width=2500
							height=2232
							layout=responsive>
						</amp-img>
						<span>EtherDelta</span>
					</a>
				</section>
			</main>
			${await footer()}
		</body>
	</html>
`