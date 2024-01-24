import {Dialogs} from "./Dialogs";
import React from "react";
import {store} from "../../redux/redux-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {GlobalStyles} from "../styles/Global.styles";

export default {
    component: Dialogs,
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
export const DialogsPage = () => {

    return <BrowserRouter><Provider store={store}><GlobalStyles/><Dialogs /></Provider></BrowserRouter>
};

