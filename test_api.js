// Test script to verify API connections
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Test DeepSeek API (original)
async function testDeepSeekAPI() {
    try {
        const apiKey = process.env.VITE_OPENAI_API_KEY;
        
        console.log('=== Testing DeepSeek API ===');
        console.log('API Key:', apiKey ? 'Available' : 'Not available');
        
        const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'Please generate a simple Python function to calculate the sum of two numbers. Return only the code without explanation.'
                },
                {
                    role: 'user',
                    content: 'Generate a simple Python function to calculate the sum of two numbers'
                }
            ],
            temperature: 0.7,
            max_tokens: 200
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Accept-Encoding': 'identity'
            },
            timeout: 30000
        });

        console.log('\n? DeepSeek API Test Successful!');
        console.log('Status:', response.status);
        console.log('Response data type:', typeof response.data);
        
        // 提取内容
        if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            const content = response.data.choices[0].message.content;
            console.log('\nExtracted content:', content);
            
            // 提取代码块
            let code = content;
            if (content.includes('```')) {
                const matches = content.match(/```(?:python)?\s*([\s\S]*?)```/);
                if (matches && matches[1]) {
                    code = matches[1];
                    console.log('\nExtracted code block:', code);
                }
            }
        }
        
        return true;
        
    } catch (error) {
        console.error('\n? DeepSeek API Test Failed!');
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            if (error.response.data) {
                console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
            }
        } else if (error.request) {
            console.error('No response received');
        }
        return false;
    }
}

// Test Gemini API (alternative)
async function testGeminiAPI() {
    try {
        const apiKey = process.env.VITE_GEMINI_API_KEY;
        
        console.log('\n=== Testing Gemini API ===');
        console.log('API Key:', apiKey ? 'Available' : 'Not available');
        
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent';
        
        const response = await axios.post(
            apiUrl,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: 'Generate a simple Python function to calculate the sum of two numbers. Return only the code without explanation.'
                            }
                        ]
                    }
                ]
            },
            {
                params: {
                    key: apiKey
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );
        
        console.log('\n? Gemini API Test Successful!');
        console.log('Status:', response.status);
        
        // 提取内容
        if (response.data.candidates && response.data.candidates[0] && 
            response.data.candidates[0].content && response.data.candidates[0].content.parts) {
            const content = response.data.candidates[0].content.parts[0].text;
            console.log('\nExtracted content:', content);
            
            // 提取代码块
            let code = content;
            if (content.includes('```')) {
                const matches = content.match(/```(?:python)?\s*([\s\S]*?)```/);
                if (matches && matches[1]) {
                    code = matches[1];
                    console.log('\nExtracted code block:', code);
                }
            }
        }
        
        return true;
        
    } catch (error) {
        console.error('\n? Gemini API Test Failed!');
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            if (error.response.data) {
                console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
            }
        } else if (error.request) {
            console.error('No response received (network issue)');
        }
        return false;
    }
}

// Run both tests
async function runTests() {
    console.log('Running API tests...\n');
    
    const deepseekSuccess = await testDeepSeekAPI();
    const geminiSuccess = await testGeminiAPI();
    
    console.log('\n=== Test Results ===');
    console.log('DeepSeek API:', deepseekSuccess ? '? Working' : '? Not working');
    console.log('Gemini API:', geminiSuccess ? '? Working' : '? Not working');
}

runTests();