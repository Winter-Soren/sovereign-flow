'use client';
import React from 'react';

type Props = {
	onPayment(id: string): void;
	products: Product[];
	tier: string;
};

type Product = {
	id: string;
	nickname: 'Free' | 'Pro' | 'Unlimited';
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
	const getDescription = (nickname: string) => {
		switch (nickname) {
			case 'Unlimited':
				return 'Enjoy a monthly torrent of credits flooding your account, empowering you to tackle even the most ambitious automation tasks effortlessly.';
			case 'Pro':
				return 'Experience a monthly surge of credits to supercharge your automation efforts. Ideal for small to medium-sized projects seeking consistent support.';
			case 'Free':
				return "Get a monthly wave of credits to automate your tasks with ease. Perfect for starters looking to dip their toes into Sovereign's automation capabilities.";
			default:
				return '';
		}
	};

	const getCredits = (nickname: string) => {
		switch (nickname) {
			case 'Free':
				return '10';
			case 'Pro':
				return '100';
			case 'Unlimited':
				return 'unlimited';
			default:
				return '';
		}
	};

	const getPrice = (nickname: string) => {
		switch (nickname) {
			case 'Free':
				return 'Free';
			case 'Pro':
				return '29.99';
			case 'Unlimited':
				return '99.99';
			default:
				return '';
		}
	};

	return (
		<section className='flex w-full justify-center md:flex-row flex-col gap-6'>
			{products.map(product => (
				<Card
					className='p-3'
					key={product.id}
				>
					<CardHeader>
						<CardTitle>{product.nickname}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-5'>
						<CardDescription>{getDescription(product.nickname)}</CardDescription>
						<div className='flex justify-between'>
							<p>{getCredits(product.nickname)} credits</p>
							<p className='font-bold'>{getPrice(product.nickname)}/mon</p>
						</div>
						{product.nickname === tier ? (
							<Button
								disabled
								variant='outline'
							>
								Active
							</Button>
						) : (
							<Button
								onClick={() => onPayment(product.id)}
								variant='outline'
							>
								Purchase
							</Button>
						)}
					</CardContent>
				</Card>
			))}
		</section>
	);
};