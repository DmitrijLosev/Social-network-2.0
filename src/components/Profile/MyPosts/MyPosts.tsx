import React from "react";
import {Post} from "./Post/Post";
import styled from "styled-components";
import {actions, PostType} from "../../../redux/profile-reducer";
import {useAppDispatch} from "../../../redux/hooks";
import {CustomInput} from "../../Commons/CustomInput/CustomInput";
import {Button} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";

export type PostFormType = { post:string }

type MyPostsPropsType = {
    posts: PostType[]
}

export const MyPosts: React.FC<MyPostsPropsType> = ({posts}) => {

    const dispatch=useAppDispatch()

    const {
        handleSubmit, control, reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            post: "",
        },
    })

    const onSubmit: SubmitHandler<PostFormType> = (data) => {
        dispatch(actions.addPost(data.post))
        reset()
    }

    return (
        <MyPostsWrapper>
            <StyledTitle>My Posts</StyledTitle>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <CustomInput name="post" control={control} placeholder="New post..." type="textarea"
                             rules={{required: "Post is required"}} isTextarea={true} maxLength={300}
                />
                <Button htmlType="submit" type="primary" disabled={!!errors.post}>Post</Button>
            </StyledForm>
            {errors.post && (
                <Error>{errors.post.message}</Error>
            )}
            {posts.map(p => <Post key={p.id} post={p}/>)}
        </MyPostsWrapper>
    );
};

const MyPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledTitle = styled.h3`

`
export const StyledForm = styled.form`
  & > div > span >textarea {
    width: 400px;
    height: 50px;
    resize: unset;
  }
  display: flex;
  gap: 10px;
  & > button {
    align-self: end;
  }
  padding-bottom: 20px;
`

const Error = styled.p`
  color: red;
  font-size: 16px;
`