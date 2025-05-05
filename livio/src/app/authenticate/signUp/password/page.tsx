//Sign Up with password page
'use client'
import React from 'react';
import { Form, Input, Button, Typography, Layout, Space, Divider } from 'antd';
import 'antd/dist/reset.css';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface PasswordProps {
    password: string;
}

export default function SignUpPassword() {
    const [form] = Form.useForm<PasswordProps>();
    const onFinish = (values: PasswordProps) => {
        console.log('Submit data:', values);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#C5D3E8' }}>
            {/* Header */}
            <Header style={{ backgroundColor: '#C5D3E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold' }}>LOGO</div>
                <Space>
                    <Button type="default" style={{ backgroundColor: '#5C7893', color: 'white', border: '100' }}>Log In</Button>
                    <Button type="default" style={{ backgroundColor: '#90A6BF', color: 'black', border: '100' }}>Sign Up</Button>
                </Space>
            </Header>

            {/* Main content */}
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
                <div style={{
                    backgroundColor: '#ADC1D7',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372', fontSize:'25px',fontWeight: 'bold' }}>Sign up</Title>
                    <Text style={{ display: 'block', textAlign: 'center', marginBottom: '24px',color:'#748291' }}>
                        Start your journey on Livio and shape the future of your life.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        name="register"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* Confirm Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#1B4372', borderColor: '#1B4372', borderRadius: '50px',padding: '20px' }}
                            >
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Divider */}
                    <Divider plain>Or</Divider>

                    {/* Google Sign-in Button */}
                    <Button
                        type="primary"
                        icon={<img src="/google.png" alt="Google" style={{ width: 24, height: 24 }} />}
                        block
                        style={{ backgroundColor: 'rgba(3, 52, 110, 0.25)',borderColor: 'rgba(3, 52, 110, 0.25)', fontWeight: 'bold', borderRadius: '50px',padding: '20px' }}
                    >
                        Sign in with Google
                    </Button>

                    {/* Sign up link */}
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Text style={{color:'#748291'}}>Don't have an account? <a href="#">Sign Up</a></Text>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
