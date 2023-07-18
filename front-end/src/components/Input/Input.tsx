import React from "react";

const Input = (props) => {
    return (
        <>
            <label 
                className="block mb-2 text-sm font-medium text-gray-500" 
                htmlFor={props?.id}
            >
                {props?.label??props?.placeholder}
            </label>
            <input 
                className={`bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${props?.customClassName} ${props.erro ? 'border-red-500' : ''}`}
                type={props?.type ?? 'text'} 
                placeholder={props.placeholder}
                name={props?.id}
                {...props}
            />
            {props.erro && <p className="mt-2 text-red-500 text-xs italic">{props.erro}</p>}
        </>
    )
};

export default Input;