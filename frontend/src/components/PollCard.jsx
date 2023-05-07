/* eslint-disable react/prop-types */
export default function PollCard(props) {
    const { title, deadline } = props;
    return (
        <div className="p-4 rounded-md bg-white drop-shadow-md flex items-start justify-between">
            <div className="w-fit">
                <span className="block text-xs text-gray-400">
                    Deadline : {deadline}
                </span>
                <a
                    href=""
                    className="block no-underline mt-2 text-blue-900 font-semibold text-xl"
                >
                    {title}
                </a>
            </div>
            <div className="flex flex-col gap-2">
                <button className="text-white px-3 py-2 rounded-md bg-blue-700 text-xs">
                    See Result
                </button>
                <button className="text-white px-3 py-2 rounded-md bg-red-700 text-xs">
                    Delete
                </button>
            </div>
        </div>
    );
}
