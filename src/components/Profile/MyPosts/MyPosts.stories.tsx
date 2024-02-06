import {MyPosts} from "./MyPosts";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {GlobalStyles} from "../../styles/Global.styles";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";


export default {
    component: MyPosts,
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
export const MyListOfPosts = () => {

    return <BrowserRouter>
            <MyPosts posts={[
                {id:1, post:  "Hello World", likesCount:10, dislikesCount:1},
                {id:2, post:  "Hello World1", likesCount:12, dislikesCount:2},
                {id:3, post:  "Hello World2", likesCount:13, dislikesCount:3}
            ]} typingPostText={"My future post here"}/>
            <GlobalStyles/>
    </BrowserRouter>
};

