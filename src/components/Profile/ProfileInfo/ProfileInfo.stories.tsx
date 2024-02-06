import {action} from "@storybook/addon-actions"
import {ProfileInfo} from "./ProfileInfo";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/redux-store";
import {GlobalStyles} from "../../styles/Global.styles";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";


export default {
    component: ProfileInfo,
    decorators:ReduxStoreProviderDecorator
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
export const profileInfo = () => {

    return <BrowserRouter>
            <ProfileInfo profile={{
                aboutMe: "я круто чувак 1001%",
                contacts: {
                facebook: "facebook.com",
                website: null,
                vk: "vk.com/dimych",
                twitter: "https://twitter.com/@sdf",
                instagram: "instagra.com/sds",
                youtube: null,
                github: "github.com",
                mainLink: null
            },
                lookingForAJob: true,
                lookingForAJobDescription: "не ищу, а дурачусь",
                fullName: "samurai dimych",
                userId: 2,
                photos: {
                small: "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
                large: "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"}
            }}/>
            <GlobalStyles/>
    </BrowserRouter>
};


