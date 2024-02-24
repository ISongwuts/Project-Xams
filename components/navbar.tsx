import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import {
	SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { useUserStore } from "@/services/stores/user.store";
import Profile from "./profile";

export const Navbar = async () => {
	const { user } = await useUserStore.getState()
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);



	return (
		<NextUINavbar maxWidth="xl" position="sticky" className=" bg-primary-gradient font-semibold text-white">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit text-xl">XAMS</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-6 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}

								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-6">
					<ThemeSwitch />
					{
						!user ?
							<Link href="/auth/signin"><Button className="bg-transparent font-bold shadow-inner  shadow-green-900 text-white">Sign In</Button></Link>
							:
							<Profile {...user}/>
					}
				</NavbarItem>

			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				{
					!user ?
						<Link href="/auth/signin"><Button className="bg-transparent font-bold shadow-inner  shadow-green-900 text-white">Sign In</Button></Link>
						:
						<Profile {...user}/>
				}
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
