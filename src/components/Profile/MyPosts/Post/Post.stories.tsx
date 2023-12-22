import {action} from "@storybook/addon-actions"
import {Post} from "./Post";
import React from "react";
import {GlobalStyles} from "../../../styles/Global.styles";




export default {
    component: Post,
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
export const OnePost = () => {

    return <><Post post={"Hello World"} dislikesCount={10} likesCount={200}/><GlobalStyles/></>
};

