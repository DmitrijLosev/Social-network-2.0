import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Input} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {updateStatus} from "../../../../redux/profile-reducer";


export const Status:React.FC<{isOwner:boolean}> = ({isOwner}) => {
    const status = useAppSelector(state => state.profilePage.status)

    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newStatusText, setNewStatusText] = useState<string>(status);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setNewStatusText(status);
    }, [status]);
    const onClickHandler = () => {
        isOwner && setEditMode(true);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(null)
        }
        setNewStatusText(e.currentTarget.value);
    }
    const onBlurHandler = () => {
        if (newStatusText.length === 0) {
            setError("Input Required")
        } else {
            setEditMode(false);
            dispatch(updateStatus(newStatusText));
        }
    }

    return (
        <>
            {!editMode ? (
                <div onDoubleClick={onClickHandler}>{status || 'change status'}</div>
            ) : (
                <Input
                    status={error ? "error" : ""}
                    placeholder={error ? error : ""}
                    name={"status"}
                    showCount
                    maxLength={200}
                    size="small"
                    value={newStatusText}
                    autoFocus
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
            )}
        </>
    );
};
