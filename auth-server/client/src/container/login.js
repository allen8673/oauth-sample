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
        <div style={{ height: '100%', width: '100%', position: 'absolute', background: '#F8F8F8' }}>
            <div style={{ height: '462px', width: '430px', position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', margin: 'auto' }}>
                <div style={{ height: '80px', background: 'black', borderRadius: '5px 5px 0px 0px', textAlign: 'center' }}>
                    <span style={{ color: '#1E90BF', fontSize: '36px', lineHeight: '80px' }}>MY</span>
                    <span style={{ color: '#FFFFFF', fontSize: '36px', marginLeft: '10px', lineHeight: '80px' }}>Auth Server</span>
                </div>
                <div style={{ background: '#FFFFFF', width: '430px', paddingTop: '10px' }}>
                    <form
                        // action='/oauth/authorize'
                        action={`${process.env.REACT_APP_AUTH_ROUTE}`}
                        method="post"
                        name="basic"
                        initialValues={{ remember: true }}
                        style={{ width: '345px', margin: 'auto' }}
                    >
                        <Input type='hidden' name='client_id' value={parame.client_id || ''} />
                        <Input type='hidden' name='redirect_uri' value={parame.redirect_uri || ''} />
                        <Input type='hidden' name='response_type' value={parame.response_type || ''} />
                        <Input type='hidden' name='grant_type' value={parame.grant_type || ''} />
                        <Input type='hidden' name='state' value={parame.state || ''} />
                        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Username:</label>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input name='username' />
                        </Form.Item>
                        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Password:</label>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password name='password' />
                            <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#666666', paddingTop: '5px' }}>
                                <label>Forgot Password?</label>
                            </div>
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" style={{ background: '#666666', border: 'none', fontSize: '14px' }} >
                                Login
                        </Button>
                            <div style={{ color: '#BA2121', fontSize: '12px', lineHeight: '12px', paddingTop: '5px' }}>
                                <label>Please enter the correct username and password.</label>
                            </div>
                        </Form.Item>

                    </form>
                    <div style={{ fontSize: '14px', height: '62px', background: '#DF5C43', borderRadius: '0px 0px 5px 5px', color: '#FFFFFF', textAlign: 'center', lineHeight: '62px' }}>© 2016 - 2020 Smartiply Inc. All rights reserved.</div>
                </div>
            </div>
        </div >)
}