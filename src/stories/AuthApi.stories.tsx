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
export const MeApi = () => {
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
export const LoginApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await authApi.login({email:"dmitrijslosevs@inbox.lv",
                password:"createreactapp", rememberMe:true})
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};
export const LogoutApi = () => {
    const [state,setState]=useState<any>()
    useEffect(() => {

        (async () => {
                let data = await authApi.logout()
                setState(data)
            }
        )()

    }, [])

    return <div>{JSON.stringify(state)}</div>
};


