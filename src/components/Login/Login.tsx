import React, {useEffect} from "react";
import {Button} from "antd";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom"
import {CustomInput} from "../Commons/CustomInput/CustomInput";


export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login = () => {
    const loginFormError = useAppSelector(state => state.authPage.loginFormError)
    const isAuth = useAppSelector(state => state.authPage.isAuth)
    const dispatch = useAppDispatch()

    const {
        handleSubmit, control,
        formState: {errors}, setError
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    useEffect(()=>{
        if(loginFormError) {
            setError('password', {
                    type:  "validate", message:loginFormError
                 })
            setError('email', {
                type:  "validate", message:" "
            })
        }
    },[loginFormError])

    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
        dispatch(login(data));

    }


    if (isAuth) {
        return <Redirect to={"/"}/>
    }

    return (
        <FormWrapper>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput name="email" control={control} label="Email" placeholder="Email" type="text"
                             rules={{required: "Username is required"}} error={errors.email?.message}
                />
                {errors.email && (
                    <Error>{errors.email.message}</Error>
                )}
                <CustomInput name="password" control={control} label="Password" placeholder="Password" type="password"
                             rules={{required: "Password is required"}} error={errors.password?.message}
                />
                {errors.password && (
                    <Error>{errors.password.message}</Error>
                )}
                <CustomInput name="rememberMe" control={control} label="Remember Me" placeholder="" type="checkbox"
                             rules={{}}
                />


                <Button htmlType="submit" type="primary" >Login</Button>
            </Form>
        </FormWrapper>
    );
};
const FormWrapper = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 350px;

  & > div > input, & > div > input:focus, & > div > input:hover, & > div > input:focus-visible,
  & > div > input:active , & > div > input:visited & > div > input:focus-within {
    background: transparent;
  }

  & > div:nth-of-type(3) {
    align-self: start;
  }
`
const Error = styled.p`
  color: darkred;
  font-size: 16px;
`