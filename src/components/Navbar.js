import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'curd pokemons', to: '/' },
        { id: 2, text: 'pokemon api', to: '/pokemon-api' },
    ];

    return (
        <div className='flex justify-between items-center h-24 w-full mx-auto px-4 text-black mb-4  shadow-slate-400 shadow-md'>
            <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Pokemon</h1>
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <Link to={item.to} key={item.id}>
                        <li
                            className='p-4 w-52 hover:bg-green-500 rounded-xl m-2 cursor-pointer duration-300 hover:text-white'
                        >
                            {item.text}
                        </li>
                    </Link>
                ))}
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            <ul
                className={
                    nav
                        ? 'fixed md:hidden left-0 top-0 text-white w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Pokemon</h1>

                {navItems.map(item => (
                    <Link to={item.to} key={item.id}>
                        <li
                            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-white cursor-pointer border-gray-600'
                        >
                            {item.text}
                        </li>
                    </Link>
                ))}
            </ul>
        </div >
    );
};

export default Navbar;