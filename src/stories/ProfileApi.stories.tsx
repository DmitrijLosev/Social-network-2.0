import {useEffect, useState} from "react";
import {profileApi} from "../api/api-profile";





export default {
    title: "API/ProfileApi",
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
export const GetProfileApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await profileApi.getProfile(3211)
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const GetProfileStatus = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await profileApi.getStatus(30556)
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const UpdateProfileStatus = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await profileApi.setStatus('HELLO')
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};


