import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get('code');

	console.log('code', code);

	const encoded = Buffer.from(`${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`).toString('base64');

	console.log('encoded', encoded);

	if (code) {
		const response = await axios('https://api.notion.com/v1/oauth/token', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Basic ${encoded}`,
				'Notion-Version': '2022-06-28'
			},
			data: JSON.stringify({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: process.env.NOTION_REDIRECT_URI!
			})
		});

		console.log('notion response: ', response.data);

		if (response) {
			const notion = new Client({
				auth: response.data.access_token
			});

			console.log('notion: ', notion);

			const databasesPages = await notion.search({
				filter: {
					value: 'database',
					property: 'object'
				},
				sort: {
					direction: 'ascending',
					timestamp: 'last_edited_time'
				}
			});

			console.log('databasesPages in notion: ', databasesPages);

			const databaseId = databasesPages?.results?.length ? databasesPages.results[0].id : '';

			console.log('database ID Notion: ', databaseId);

			return NextResponse.redirect(
				`https://localhost:3000/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`
			);
		}
	}

	return NextResponse.redirect('https://localhost:3000/connections');
}
