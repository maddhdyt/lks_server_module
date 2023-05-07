import clsx from 'clsx';
/* eslint-disable react/prop-types */
export default function Navbar({ children }) {
    return (
        <div className="w-full h-24 bg-white fixed top-0 left-0 z-10">
            <div className="page-container border-b border-gray-200">
                <div className="flex justify-between items-center h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

function Title({ children }) {
    return <div className="text-2xl font-bold text-blue-800">{children}</div>;
}

function Button(props) {
    const { text, children } = props;
    return (
        <button
            {...props}
            className="w-full text-sm text-left pt-2 font-medium text-red-500 border-t border-gray-200"
        >
            {text || children}
        </button>
    );
}

function Control(props) {
    const { children } = props;
    return (
        <div className="relative">
            <div
                {...props}
                className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden cursor-pointer"
            >
                <img src="/icon.png" className="object-cover w-full" />
            </div>
            {children}
        </div>
    );
}

function Menu(props) {
    const { children, className } = props;
    return (
        <ul className={clsx(className, 'flex gap-2 my-auto')}>{children}</ul>
    );
}

function Item(props) {
    const { text, className, children } = props;
    return (
        <li
            className={clsx(
                className,
                'px-3 py-2 rounded-md hover:bg-blue-700 group cursor-pointer'
            )}
        >
            <a
                {...props}
                className="text-sm text-gray-400 font-medium no-underline group-hover:text-white"
            >
                {text || children}
            </a>
        </li>
    );
}

function Dropdown(props) {
    return (
        <div className="min-w-[180px] absolute top-16 px-4 py-3  bg-white drop-shadow rounded-lg right-0">
            <a className="block text-sm mb-2 rounded-md no-underline text-gray-600 cursor-pointer ">
                My Profile
            </a>
            <a className="block text-sm mb-3 rounded-md no-underline text-gray-600 cursor-pointer ">
                Change Password
            </a>
            <Navbar.Button {...props}>Logout</Navbar.Button>
        </div>
    );
}

Navbar.Title = Title;
Navbar.Dropdown = Dropdown;
Navbar.Item = Item;
Navbar.Button = Button;
Navbar.Menu = Menu;
Navbar.Control = Control;
