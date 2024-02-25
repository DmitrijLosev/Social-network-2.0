import {Controller} from "react-hook-form";
import {Input} from "antd";
import React from "react";


export interface CustomInputProps {
    label?: string;
    control: any;
    name: string;
    placeholder: string;
    type: string;
    rules: Record<string, string>;
    isTextarea?:boolean,
    maxLength?:number,
    error?:string
}
export const CustomInput = ({   maxLength = 200,
                                label="",
                                type = "text",
                                placeholder = "Enter text",
                                isTextarea=false,
                                 error="",
                                ...rest
                            }: CustomInputProps) => {

        const { TextArea } = Input;
    return (
        <div>
            <label>{label}</label>
            <Controller
                name={rest.name}
                control={rest.control}
                rules={rest.rules}
                render={({field}) => (
                    !isTextarea ? <Input autoComplete="false"
                            status={error ? "error" : ""}
                           {...field}
                           type={type}
                           placeholder={placeholder}
                           maxLength={maxLength}
                    /> : <TextArea
                                {...field} showCount
                                placeholder={placeholder}
                                maxLength={maxLength}
                                status={error ? "error" : ""}
                    />
                )}
            />
        </div>
    );
};