import Book from '@/public/assets/images/book.png'
import Kid from '@/public/assets/images/kid.png'
export type SiteConfig = typeof siteConfig


export const siteConfig = {
	name: "Xams",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "All Courses",
			href: "/allcourses",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Contact Us",
			href: "/contact",
		}
	],
	navMenuItems: [
		{
			label: "All Courses",
			href: "/allcourses",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Contact Us",
			href: "/contact",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Not a member?",
			href: "/auth/signin",
		},
	],
	formConfig: {
		signUpForm: {
			attribute: [{
				label: 'Username',
				type: 'text',
				name: 'username'
			},
			{
				label: 'Prefix',
				type: 'text',
				name: 'prefix'
			},
			{
				label: 'Full Name',
				type: 'Full Name',
				name: 'Full Name'
			},
			{
				label: 'Password',
				type: 'password',
				name: 'password'
			},
			{
				label: 'Confirm Password',
				type: 'password',
				name: 'confirm_password'
			},
			{
				label: 'Telephone',
				type: 'text',
				name: 'tel'
			},
			{
				label: 'Personal ID',
				type: 'text',
				name: 'personal_id'
			}],
			sideCard: {
				cardTitle: 'Start your education with us.',
				cardDescription: 'Students can easily submit assignments directly through the platform. Upload documents, presentations, or multimedia files, and receive instant confirmation upon submission.',
				cardImage: Kid
			}
		},
		signInForm: {
			attribute: [{
				label: 'Username',
				type: 'text',
				name: 'username'
			},
			{
				label: 'Password',
				type: 'password',
				name: 'password'
			},],
			sideCard: {
				cardTitle: 'Ace Your Exams and Assignments!',
				cardDescription: 'Prepare for exams and complete assignments effortlessly with our intuitive platform. Access study materials, submit assignments, and track your progress seamlessly. Stay organized and excel academically!',
				cardImage: Book
			}
		}

	},

};
