import clsx from 'clsx';
/* eslint-disable react/prop-types */
export default function Navbar({ children }) {
    return (
        <div className="w-full h-24 bg-white fixed top-0 left-0">
            <div className="page-container border-b border-gray-200">
                <div className="flex justify-between items-center h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

function Title({ children }) {
    return <div className="text-xl font-bold text-blue-800">{children}</div>;
}

function Button(props) {
    const { text, children } = props;
    return (
        <button
            {...props}
            className="text-sm px-3 py-2 rounded-lg bg-red-100 font-medium text-red-500"
        >
            {text || children}
        </button>
    );
}

function Control() {
    return (
        <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden cursor-pointer">
            <img src="/icon.png" className="object-cover w-full" />
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
                'px-3 py-2 rounded-md hover:bg-blue-800 group cursor-pointer'
            )}
        >
            <a
                {...props}
                className="text-sm text-gray-500 font-semibold no-underline group-hover:text-white"
            >
                {text || children}
            </a>
        </li>
    );
}

Navbar.Title = Title;
Navbar.Item = Item;
Navbar.Button = Button;
Navbar.Menu = Menu;
Navbar.Control = Control;
