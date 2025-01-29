import { Calendar, Menu } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="p-2 text-black flex justify-between items-center">
			<div className="flex">
				<Calendar className="mr-2 ml-2" /> <span className="font-bold">Calendario</span>
			</div>
			<div className="flex items-center">
				<Menu />
				<img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Foto de perfil" className="rounded-full w-12 h-12 ml-2 mr-2" />
			</div>
		</nav>
	);
};

export default Navbar;
