import {action} from "@storybook/addon-actions"
import {Users} from "./Users";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../redux/redux-store";
import {GlobalStyles} from "../styles/Global.styles";


export default {
    component: Users,
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
export const UsersList = () => {

    return <BrowserRouter>
        <Provider store={store}>
            <Users/>
            <GlobalStyles/>
        </Provider>
    </BrowserRouter>
};




