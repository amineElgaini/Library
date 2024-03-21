import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";

const dashBoardLinks = [
    {
        link: "Home",
        name: "name1",
        desc: "desc1",
    },
    {
        link: "l2",
        name: "Borrowing Books",
        desc: "Manage Borrowing Books. search,\
        Return/Pay A Book",
    },
    {
        link: "l3",
        name: "name3",
        desc: "desc3",
    },
];

function NavBar() {
    return (
        <>
            <div className="mt-2 mb-10 pb-2 border-b-2 border-b-slate-600">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList>
                        <ModeToggle />
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Dashboard
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[250px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                                    {dashBoardLinks.map((link) => (
                                        <ListItem
                                            key={link.name}
                                            link={link.link}
                                            name={link.name}
                                            desc={link.desc}
                                        />
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link to="/books" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Books
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
}

const ListItem = ({ link, name, desc }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={link}
                    className={
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                >
                    <div className="text-sm font-medium leading-none">
                        {name}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {desc}
                    </p>
                </Link>
            </NavigationMenuLink>{" "}
        </li>
    );
};

export default NavBar;
