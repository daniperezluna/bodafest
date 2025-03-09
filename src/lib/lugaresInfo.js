import { FaHotel } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { FaGrinStars } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";

export const lugaresInfo = [
    {
        id: 1,
        title: "Alojamientos",
        desc: "Descansa y recarga las pilas para disfrutar al máximo del bodafest",
        icon: <FaHotel size={64}/>,
        link: "/alojamientos"
    },
    {
        id: 2,
        title: "Restaurantes",
        desc: "Del sábado nos ocupamos nosotros, el resto de días te toca a ti",
        icon: <MdFastfood size={64}/>,
        link: "/restaurantes"
    },
    {
        id: 3,
        title: "Maquillaje y Peluquería",
        desc: "Ponte guap@ para el bodafest",
        icon: <FaGrinStars size={64}/>,
        link: "/maquillaje-peluqueria"
    },
    {
        id: 4,
        title: "Teléfonos de interés",
        desc: "Para cualquier cosa que necesites",
        icon: <FaPhoneSquareAlt size={64}/>,
        link: "/info"
    }
]