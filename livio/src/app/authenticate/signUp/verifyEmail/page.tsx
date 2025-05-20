'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Layout, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface VerifyProps {
    digit0: string;
    digit1: string;
    digit2: string;
    digit3: string;
    digit4: string;
    digit5: string;
}

export default function EmailVerification() {
    const [form] = Form.useForm<VerifyProps>();
    const [email, setEmail] = useState<string>('');
    const [isVerified, setIsVerified] = useState(false); // State to track verification status
    const [isResendLoading, setIsResendLoading] = useState(false); // State to track resend status
    const router = useRouter(); // Khởi tạo router để điều hướng

    // Lấy email từ sessionStorage
    React.useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail); // Đặt email từ sessionStorage
        }
    }, []);

    const onFinish = async (values: VerifyProps) => {

        const activationCode = values.digit0 + values.digit1 + values.digit2 + values.digit3 + values.digit4 + values.digit5;
        try {
            const response = await fetch('https://localhost:44383/api/Users/VerifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ActiveCode: activationCode }),
            });

            if (response.ok) {
                alert('Verification successful!');
                setIsVerified(true); // Update verification status
                router.push('/authenticate/signUp/verifyEmail/setPassword'); // Redirect after successful verification
            } else {
                const error = await response.text();
                console.error('API Error:', error);
                alert(`Verification failed: ${error}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred while connecting to the API.');
        }
    };

    // Function to handle resend email
    const handleResendEmail = async () => {
        setIsResendLoading(true); // Show loading state
        try {
            // Replace the URL with your API that triggers email resend logic
            const response = await fetch('https://localhost:44383/api/Users/ResendActivationCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include any necessary body data if needed
                body: JSON.stringify({ email: email }), // Replace with actual email if required
            });

            if (response.ok) {
                alert('Verification email sent successfully!');
            } else {
                const error = await response.text();
                console.error('API Error:', error);
                alert(`Resend failed: ${error}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred while connecting to the API.');
        } finally {
            setIsResendLoading(false); // Hide loading state after request
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#C5D3E8' }}>
            {/* Header */}
            <Header style={{
                backgroundColor: '#C5D3E8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 40px'
            }}>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    backgroundColor: '#B9C8DC',
                    padding: '6px 20px',
                    borderRadius: '10px'
                }}>LOGO</div>

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
                    maxWidth: '420px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <MailOutlined style={{ fontSize: '48px', color: '#1B4372' }} />
                        <Title level={4} style={{ marginTop: '16px', color: '#1B4372' }}>Verify your email</Title>
                        <Text style={{ color: '#586577' }}>
                            Enter the 6-digit verification code we sent to your inbox below:
                        </Text>
                    </div>

                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="horizontal"
                    >
                        {/* 6 code entry boxes */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '24px' }}>
                            {Array.from({ length: 6 }, (_, i) => (
                                <Form.Item
                                    key={i}
                                    name={`digit${i}`}
                                    rules={[{ required: true, message: '' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input maxLength={1} style={{ textAlign: 'center', fontSize: '18px', padding: '8px' }} />
                                </Form.Item>
                            ))}
                        </div>

                        {/* Verify Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#839EBC', borderColor: '#839EBC', borderRadius: '50px', padding: '20px' }}
                            >
                                Verify
                            </Button>
                        </Form.Item>
                        {/* Resend Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                onClick={handleResendEmail}
                                loading={isResendLoading} // Show loading state when resend is in progress
                                style={{ backgroundColor: '#1B4372', borderColor: '#1B4372', borderRadius: '50px', padding: '20px' }}
                            >
                                Resend Email
                            </Button>

                            {isVerified && (
                                <div style={{ textAlign: 'center', marginTop: '16px', color: '#1B4372' }}>
                                    <Text>Email verified successfully! You can now create your password.</Text>
                                </div>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}
