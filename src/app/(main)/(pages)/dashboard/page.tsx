import React from 'react';

const DashboardPage = () => {
	return (
		<div className='flex flex-col gap-4 relative'>
			<h1 className='sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg'>
				Dashboard
			</h1>
			<div className='flex flex-col gap-4 p-6'>
				<h2 className='text-2xl'>Welcome to the Dashboard</h2>
				<p>blah blah stuff here!! :</p>
			</div>
		</div>
	);
};

export default DashboardPage;
