import {action} from "@storybook/addon-actions"
import {MyPosts} from "./MyPosts";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/redux-store";
import {GlobalStyles} from "../../styles/Global.styles";


export default {
    component: MyPosts,
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
export const MyListOfPosts = () => {

    return <BrowserRouter>
        <Provider store={store}>
            <MyPosts posts={[
                {id:1, post:  "Hello World", likesCount:10, dislikesCount:1},
                {id:2, post:  "Hello World1", likesCount:12, dislikesCount:2},
                {id:3, post:  "Hello World2", likesCount:13, dislikesCount:3}
            ]} typingPostText={"My future post here"}/>
            <GlobalStyles/>
        </Provider>
    </BrowserRouter>
};

