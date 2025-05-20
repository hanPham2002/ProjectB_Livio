'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Layout, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

interface PasswordProps {
    password: string;
    confirmPassword: string;
}

export default function SignUpPassword() {
    const [form] = Form.useForm<PasswordProps>();
    const router = useRouter();
    const [email, setEmail] = useState<string>(''); // State to store email

    // Lấy email từ sessionStorage
    React.useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail); // Đặt email từ sessionStorage
        }
    }, []);

    const onFinish = async (values: PasswordProps) => {
        const { password, confirmPassword } = values;

        // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp nhau
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('https://localhost:44383/api/Users/SetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, // Gửi email đã lưu vào API
                    password: password,
                    confirmPassword: confirmPassword
                }),
            });

            if (response.ok) {
                alert('Password set successfully!');
                // Chuyển hướng người dùng đến trang đăng nhập sau khi đặt mật khẩu thành công
                router.push('/authenticate/login'); // Hoặc trang nào bạn muốn chuyển hướng
            } else {
                const error = await response.text();
                alert(`Password update failed: ${error}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred while connecting to the API.');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#C5D3E8' }}>
            {/* Header */}
            <Header style={{
                backgroundColor: '#C5D3E8',
                padding: '0 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    backgroundColor: '#B9C8DC',
                    padding: '6px 20px',
                    borderRadius: '10px'
                }}>LOGO</div>
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
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372' }}>Set Your Password</Title>
                    <Form
                        form={form}
                        layout="vertical"
                        name="setPassword"
                        onFinish={onFinish}
                    >
                        {/* Password Field */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        {/* Confirm Password Field */}
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                        >
                            <Input.Password placeholder="Confirm your password" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#1B4372', borderColor: '#1B4372', borderRadius: '50px', padding: '20px' }}
                            >
                                Set Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}
