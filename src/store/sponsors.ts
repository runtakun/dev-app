interface SponsorImage {
	readonly url: string
	readonly width: number
	readonly height: number
}
export type MessageLocale = 'en' | 'ja'
export interface SponsorMessage {
	readonly locale: MessageLocale
	readonly text: string
}
export type SponsorMessages = ReadonlyArray<SponsorMessage>
export type SponsorTier = 10 | 20 | 30
export interface Sponsor {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
	readonly messages: SponsorMessages
	readonly link: string
	readonly image: SponsorImage
	readonly tier: SponsorTier
	readonly unlisted?: boolean
}
export type Sponsors = ReadonlyArray<Sponsor>

const utc = (yaer: number, month: number, date: number) =>
	new Date(Date.UTC(yaer, month - 1, date, 0, 0, 0, 0))

const s: Sponsors = [
	{
		id: 'sios-technology',
		tier: 10,
		start_date: utc(2019, 2, 1),
		expiry_date: utc(2019, 12, 31),
		name: 'SIOS Technology, Inc.',
		messages: [
			{
				locale: 'en',
				text: `SIOS Technology has been supporting companies and organizations that use OSS. Why don’t you join us?  If you are interested in OSS or new technologies,Please contact us anytime.`
			},
			{
				locale: 'ja',
				text: `サイオステクノロジーは、OSSを利活⽤している企業や団体を積極的に⽀援しています。そんな私たちと一緒に働きませんか？OSSや新しい技術分野にチャレンジをしていきたいという⽅はぜひお問い合わせください。`
			}
		],
		link: 'https://tech-lab.sios.jp/pr/sponsor-dev2019',
		image: {
			url: 'https://asset.devtoken.rocks/sponsor/sios_logo_white.png',
			width: 660,
			height: 682
		}
	}
]
const example: Sponsors = [
	{
		id: 'example',
		tier: 10,
		start_date: utc(2019, 1, 1),
		expiry_date: utc(9999, 12, 31),
		name: 'Your Name',
		messages: [
			{
				locale: 'en',
				text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
			},
			{
				locale: 'ja',
				text: `親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。`
			}
		],
		link: 'https://devtoken.rocks/',
		image: {
			url: 'https://asset.devtoken.rocks/og.png',
			width: 1200,
			height: 630
		},
		unlisted: true
	}
]

export const sponsors: Sponsors = [...s, ...example]
