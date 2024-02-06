import {useEffect, useState} from "react";
import {authApi} from "../api/api-auth";



export default {
    title: "API/AuthApi",
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
export const GetUsersApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await authApi.getAuth()
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};



