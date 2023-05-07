/* eslint-disable react/prop-types */
export default function Card(props) {
    const { title, count } = props;
    return (
        <div className="p-4 py-[20px] h-fit rounded-md bg-gradient-to-r from-blue-800  to-blue-700">
            <h4 className="text-white text-lg font-semibold">{title}</h4>
            <span className="block text-5xl text-white font-semibold mt-4">
                {count}
            </span>
        </div>
    );
}
