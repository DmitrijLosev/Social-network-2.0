import {action} from "@storybook/addon-actions"
import {Header} from "./Header";
import React from "react";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {BrowserRouter} from "react-router-dom";



export default {
    component: Header,
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
export const OnlyHeader = () => {

    return <BrowserRouter><Header/></BrowserRouter>
};

