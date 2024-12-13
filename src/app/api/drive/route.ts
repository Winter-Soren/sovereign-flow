import { google } from 'googleapis';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
	const oauth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.OAUTH2_REDIRECT_URI
	);

	const { userId } = auth();

	if (!userId) {
		return NextResponse.json({ message: 'User not found' });
	}

	const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_google');

	const accessToken = clerkResponse.data[0].token;
	oauth2Client.setCredentials({
		access_token: accessToken
	});

	const drive = google.drive({
		version: 'v3',
		auth: oauth2Client
	});

	try {
		const response = await drive.files.list();
		console.log('drive files:', response);

		if (response.data.files && response.data.files.length) {
			console.log('drive file:', response.data.files[0]);

			// fetch the google api
			const fileMetaData = response.data.files[0];
			const fileId = fileMetaData.id;
			const file = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
				responseType: 'arraybuffer'
			});

			const contentType = file.headers['content-type'];
			const data = file.data;

			console.log('file data:', data);

			return NextResponse.json(
				{
					message: {
						contentType,
						data: Buffer.from(data, 'binary').toString('base64')
					}
				},
				{
					status: 200
				}
			);
		} else {
			return NextResponse.json(
				{
					message: 'No files found'
				},
				{
					status: 200
				}
			);
		}
	} catch (error) {
		console.log('error in api/drive:', error);
		return NextResponse.json(
			{
				message: 'Something went wrong',
				error: error
			},
			{
				status: 500
			}
		);
	}
}
