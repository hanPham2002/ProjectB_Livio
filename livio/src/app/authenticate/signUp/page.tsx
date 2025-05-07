'use client'
import React from 'react';
import { Form, Input, Button, Typography, Layout, Divider } from 'antd';
import { useRouter } from 'next/navigation'; // Để điều hướng trang sau khi đăng ký thành công
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface EmailProps {
    email: string;
}

export default function SignUpEmail() {
    const [form] = Form.useForm<EmailProps>();
    const router = useRouter(); // Khởi tạo router để điều hướng đến trang xác minh email

    const onFinish = async (values: EmailProps) => {
        const { email } = values;


        // Gửi yêu cầu đăng ký đến API
        try {
            const response = await fetch('https://localhost:44383/api/Users/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Registration successful!');
                // Lưu email vào sessionStorage
                sessionStorage.setItem("email", email);
                router.push('/authenticate/signUp/verifyEmail'); // Điều hướng đến trang xác minh email
            } else {
                const error = await response.text();
                alert(`Registration failed: ${error}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred while connecting to the API.');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#C5D3E8' }}>
            <Header style={{ backgroundColor: '#C5D3E8', padding: '0 40px' }}>
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
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372', fontSize: '25px', fontWeight: 'bold' }}>Sign up</Title>
                    <Text style={{ display: 'block', textAlign: 'center', marginBottom: '24px', color: '#748291' }}>
                        Start your journey on Livio and shape the future of your life.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        name="register"
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input style={{ borderRadius: '50px', padding: '8px' }} placeholder="Enter Email" />
                        </Form.Item>

                        {/* Confirm Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#1B4372', borderColor: '#1B4372', borderRadius: '50px', padding: '20px' }}
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
                        style={{ backgroundColor: 'rgba(3, 52, 110, 0.25)', borderColor: 'rgba(3, 52, 110, 0.25)', fontWeight: 'bold', borderRadius: '50px', padding: '20px' }}
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
