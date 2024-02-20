export type SiteConfig = typeof siteConfig;

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
	],
};
