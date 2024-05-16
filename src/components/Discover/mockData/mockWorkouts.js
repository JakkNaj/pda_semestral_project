export const popularWorkouts = [
	{
		id:1,
		title: 'Simple Six-Pack',
		target: 'Abs',
		exercises: [
			{
				name: 'Crunches',
				sets: [
					{ number: 1, weight: 70, reps: 15 },
					{ number: 2, weight: 80, reps: 20 },
					{ number: 3, weight: 80, reps: 15 },
				]
			},
			{
				name: 'Pull-ups',
				sets: [
					{ number: 1, weight: "bodyweight", reps: 15 },
					{ number: 2, weight: "bodyweight", reps: 20 },
					{ number: 3, weight: "bodyweight", reps: 30 },
				]
			},
		]
	},
	{
		id:2,
		title: 'Sleever Buster',
		target: 'Arms',
		exercises: [
			{
				name: 'Bicep Curls',
				sets: [
					{ number: 1, weight: 15, reps: 10 },
					{ number: 2, weight: 30, reps: 20 },
					{ number: 3, weight: 45, reps: 20 },
				]
			},
		]
	},
];

export const forBeginners = [
	{
		id: 3,
		title: 'Stranger Shoulders',
		target: 'Shoulders',
		exercises: [
			{
				name: 'Shoulder Press',
				sets: [
					{ number: 1, weight: 20, reps: 10 },
					{ number: 2, weight: 25, reps: 10 },
					{ number: 3, weight: 30, reps: 10 },
				]
			},
			// Add more exercises as needed
		]
	},
	{
		id:4,
		title: 'Healthy Back',
		target: 'Back',
		exercises: [
			{
				name: 'Deadlift',
				sets: [
					{ number: 1, weight: 60, reps: 10 },
					{ number: 2, weight: 70, reps: 10 },
					{ number: 3, weight: 80, reps: 10 },
				]
			},
		]
	},
	{
		id: 7,
		title: 'Full Body beginner',
		target: 'Full body',
		exercises: [
			{
				name: 'Squats',
				sets: [
					{ number: 1, weight: 50, reps: 10 },
					{ number: 2, weight: 60, reps: 10 },
					{ number: 3, weight: 70, reps: 10 },
				]
			},
		]
	},
];

export const upperBodyOnly = [
	{
		id: 5,
		title: 'Upper Body Blast',
		target: 'Abs',
		exercises: [
			{
				name: 'Sit-ups',
				sets: [
					{ number: 1, weight: 0, reps: 15 },
					{ number: 2, weight: 0, reps: 15 },
					{ number: 3, weight: 0, reps: 15 },
				]
			},
		]
	},
	{
		id: 6,
		title: 'Upper Body Pump',
		target: 'Arms, Shoulders, Abs',
		exercises: [
			{
				name: 'Push-ups',
				sets: [
					{ number: 1, weight: 0, reps: 15 },
					{ number: 2, weight: 0, reps: 15 },
					{ number: 3, weight: 0, reps: 15 },
				]
			},
		]
	},
];