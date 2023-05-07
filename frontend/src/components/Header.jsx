/* eslint-disable react/prop-types */
export default function Header({ children }) {
    return (
        <div className="w-full flex justify-between items-center mt-32">
            <div className="border-l-4 border-l-gray-500 pl-2 block font-semibold text-gray-500 text-xl">
                {children}
            </div>
        </div>
    );
}
