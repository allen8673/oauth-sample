import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

export function Login() {
    const [parame, setParame] = useState({});

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const result = {};
        for (var pair of params.entries()) {
            result[pair[0]] = pair[1]
        }
        console.log(result)
        setParame(result);
    }, []);


    return (
    <form
        action='/oauth/authorize' method="post"
        name="basic"
        initialValues={{ remember: true }}
        style={{ width: 500 }}
    >

        <Input type='hidden' name='client_id' value={parame.client_id || ''} />
        <Input type='hidden' name='redirect_uri' value={parame.redirect_uri || ''} />
        <Input type='hidden' name='response_type' value={parame.response_type || ''} />
        <Input type='hidden' name='grant_type' value={parame.grant_type || ''} />
        <Input type='hidden' name='state' value={parame.state || ''} />
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input name='username' />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password name='password' />
        </Form.Item>

        <Form.Item >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </form>)
}