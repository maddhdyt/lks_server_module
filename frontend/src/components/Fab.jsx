/* eslint-disable react/prop-types */
import 'boxicons';

export default function Fab(props) {
    const { text } = props;
    return (
        <a
            {...props}
            className="no-underline transition-all duration-300 fixed bottom-24 right-20 px-3 py-3 hover:!pl-5 rounded-full bg-blue-700 flex items-center justify-center gap-2 text-white cursor-pointer group"
        >
            <div
                className="transition-all duration-300 my-auto absolute group-hover:static hidden group-hover:!block text-sm
            "
            >
                {text}
            </div>
            <box-icon {...props} color="white" size="sm"></box-icon>
        </a>
    );
}
