import {useEffect, useState} from "react";
import {dialogsApi} from "../api/api-dialogs";



export default {
    title: "API/DialogsApi",
};


//SYNTAX SUGAR!!!!!!!!!!!!!!!!!!!!!!!!!
/*type Story = StoryObj<typeof ControlledAccordion>;

export const FirstStory: Story = {
    args: {
        titleValue:"CollapsedAccordion",
        collapsed:true,
    },
};*/

/*const onChangeHandler = action("onChange Accordion")
const callback = action("some item was clicked")*/

export const GetDialogsApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.getDialogs()
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const PutDialogApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.putDialogWithUserInTopOfList(2)
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const GetDialogWithUserApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.getDialogWithUser(29181,1,10)
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const SentMessageToUserApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.sentMessageToUser(222,"Hello Dimasik")
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const IsMessageViewedByIdApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.checkMessageViewed("083071f1-ea29-40b4-af4e-646fe1760938")
                setState(data)
            }
        ) ()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const DeleteMessageByIdApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.deleteMessage("259cf2a1-f651-475f-b172-7c003d30100c")
                setState(data)
            }
        ) ()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const GetMessageAfterDateApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.getMessageAfterThisDate(2,"2024-1-20")
                setState(data)
            }
        ) ()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const GetNewMessagesCount = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await dialogsApi.getNewMessagesCount()
                setState(data)
            }
        ) ()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};


