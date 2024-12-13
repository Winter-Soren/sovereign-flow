import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { BillingProvider } from '@/providers/billing-provider';
import ModalProvider from '@/providers/modal-provider';
import { dark } from '@clerk/themes';
import { Toaster } from '@/components/ui/sonner';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sovereign',
	description: 'This is integration of'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark
			}}
			signUpFallbackRedirectUrl={'/'}
		>
			<html lang='en'>
				<body className={font.className}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						storageKey='theme'
						disableTransitionOnChange
					>
						<BillingProvider>
							<ModalProvider>
								{children}
								<Toaster />
							</ModalProvider>
						</BillingProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
