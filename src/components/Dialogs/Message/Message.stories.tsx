import {action} from "@storybook/addon-actions"
import {MessageItem} from "./Message";
import React from "react";

export default {
    component: MessageItem,
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
export const OneMessage = () => {
    return <MessageItem message={"Hello World"}/>
};

