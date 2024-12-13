'use client';

import { useBilling } from '@/providers/billing-provider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SubscriptionCard } from './subscription-card';
import CreditTracker from './creadits-tracker';
import Loading from '@/components/icons/loadings';

type Props = {};

const BillingDashboard = (props: Props) => {
	const { credits, tier } = useBilling();
	console.log('credits and tier: ', credits, tier);
	const [stripeProducts, setStripeProducts] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const onStripeProducts = async () => {
		setLoading(true);
		const { data } = await axios.get('/api/payment');
		if (data) {
			console.log('data get from /api/payment: ', data);
			setStripeProducts(data);
			setLoading(false);
		}
	};

	useEffect(() => {
		onStripeProducts();
	}, []);

	const onPayment = async (id: string) => {
		const { data } = await axios.post(
			'/api/payment',
			{
				priceId: id
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		window.location.assign(data);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className='flex p-6'>
						<SubscriptionCard
							onPayment={onPayment}
							tier={tier}
							products={stripeProducts}
						/>
					</div>
					<CreditTracker
						tier={tier}
						credits={parseInt(credits)}
					/>
				</>
			)}
		</>
	);
};

export default BillingDashboard;
