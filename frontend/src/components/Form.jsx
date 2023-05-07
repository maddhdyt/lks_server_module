/* eslint-disable react/prop-types */
export default function Form({ children }) {
    return (
        <form action="" className="w-full mt-10">
            <div className="grid grid-cols-2 gap-4">{children}</div>
        </form>
    );
}

function Item(props) {
    const { children, label } = props;
    return (
        <div className="w-full flex flex-col gap-2">
            <label {...props} className="font-medium text-gray-600">
                {label}
            </label>
            {children}
        </div>
    );
}

function Input(props) {
    const { type = 'text' } = props;
    return (
        <input
            {...props}
            type={type}
            className="transition-all duration-300 px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-200  rounded-md border border-gray-200 bg-white"
        />
    );
}

function Textarea({ text }) {
    return (
        <textarea className="transition-all duration-300 p-3 text-sm outline-none focus:ring-2 ring-blue-200  rounded-md border border-gray-200 bg-white h-32 resize-none">
            {text}
        </textarea>
    );
}

Form.Item = Item;
Form.Input = Input;
Form.Textarea = Textarea;
