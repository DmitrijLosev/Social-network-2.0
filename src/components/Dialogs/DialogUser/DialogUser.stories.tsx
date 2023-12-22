import {action} from "@storybook/addon-actions"
import {DialogUsersItem} from "./DialogUser";
import React from "react";
import {BrowserRouter} from "react-router-dom";

export default {
    component: DialogUsersItem,
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
export const OneUserForMessaging = () => {
    return <BrowserRouter><DialogUsersItem id={5} name={"Misha"}/></BrowserRouter>
};
