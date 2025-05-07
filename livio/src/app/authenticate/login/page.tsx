// Login page

'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Layout, Space, Divider } from 'antd';
import { useRouter } from 'next/navigation'; // Để điều hướng sau khi đăng nhập thành công
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface LoginProps {
    email: string;
    password: string;
}

export default function Login() {
    const [form] = Form.useForm<LoginProps>();
    const [loading, setLoading] = useState(false); // Trạng thái load khi gửi API
    const router = useRouter(); // Khởi tạo router để điều hướng sau khi đăng nhập thành công

    const onFinish = async (values: LoginProps) => {
        setLoading(true); // Bắt đầu loading khi gửi API

        const { email, password } = values;

        try {
            const response = await fetch('https://localhost:44383/api/Users/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful', data);
                alert('Login successful!');

                // Sau khi đăng nhập thành công, chuyển hướng đến trang chính hoặc dashboard
                router.push('/dashboard'); // Ví dụ: chuyển đến trang Dashboard sau khi đăng nhập thành công
            } else {
                const error = await response.text();
                alert(`Login failed: ${error}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred while connecting to the API.');
        } finally {
            setLoading(false); // Tắt loading sau khi nhận phản hồi từ API
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#C5D3E8' }}>
            <Header style={{ backgroundColor: '#C5D3E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold' }}>LOGO</div>
            </Header>

            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
                <div style={{
                    backgroundColor: '#ADC1D7',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372', fontSize: '25px', fontWeight: 'bold' }}>Log In</Title>
                    <Text style={{ display: 'block', textAlign: 'center', marginBottom: '24px', color: '#748291' }}>
                        Welcome back! Log in to stay updated with your financial and schedule management's.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please input your E-mail!' },
                            ]}
                        >
                            <Input style={{ borderRadius: '50px', padding: '8px' }} placeholder="Enter Email" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password style={{ borderRadius: '50px', padding: '8px' }} placeholder="Enter Password" />
                        </Form.Item>

                        {/* Forgot Password */}
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <a href="#" style={{ color: '#1B4372' }}>Forgot Password?</a>
                        </div>

                        {/* Login Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading} // Hiển thị loading khi gửi yêu cầu
                                style={{ backgroundColor: '#1B4372', borderColor: '#1B4372', borderRadius: '50px', padding: '20px' }}
                            >
                                Log In
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
                        style={{ backgroundColor: 'rgba(3, 52, 110, 0.25)', fontWeight: 'bold', borderRadius: '50px', padding: '20px' }}
                    >
                        Sign in with Google
                    </Button>

                    {/* Sign up link */}
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Text style={{ color: '#748291' }}>Don't have an account? <a href="#">Sign Up</a></Text>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
