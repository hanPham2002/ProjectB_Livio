//verityEmail
'use client'
import React from 'react';
import { Form, Input, Button, Typography, Layout, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function EmailVerification() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const code = Object.values(values).join('');
        console.log('Verification code:', code);
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
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}
                    >
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
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}
