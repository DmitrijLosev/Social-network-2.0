import {useEffect, useState} from "react";
import {usersApi} from "../api/api-users";




export default {
    title: "API/UsersApi",
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
                let data = await usersApi.getUsers(100,2)
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};



