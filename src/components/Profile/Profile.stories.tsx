import {action} from "@storybook/addon-actions"
import {Profile} from "./Profile";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../redux/redux-store";
import {GlobalStyles} from "../styles/Global.styles";


export default {
    component: Profile,
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
        <Provider store={store}>
            <Profile/>
            <GlobalStyles/>
        </Provider>
    </BrowserRouter>
};




