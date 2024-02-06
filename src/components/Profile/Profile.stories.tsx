import {Profile} from "./Profile";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {GlobalStyles} from "../styles/Global.styles";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";


export default {
    component: Profile,
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
export const ProfilePage = () => {

    return <BrowserRouter>
            <Profile/>
            <GlobalStyles/>
    </BrowserRouter>
};




