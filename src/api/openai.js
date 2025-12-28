import axios from 'axios';

export const getAICode = async (prompt) => {
    try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        console.log('Using DeepSeek API Key:', apiKey ? 'Available' : 'Not available');
        
        if (!apiKey) {
            throw new Error('VITE_OPENAI_API_KEY is not set in .env file');
        }
        
        // 构建系统提示和用户消息
        const systemPrompt = '你是一个专业的地理空间数据处理和GIS开发专家，请根据用户的要求生成高质量的Python代码，专注于地理空间分析、遥感图像处理等任务。请直接返回代码，不要添加额外解释。';
        
        // 使用代理路径访问DeepSeek API，避免CORS问题
        const apiUrl = '/api/deepseek/v1/chat/completions';
        
        console.log('Sending request to DeepSeek API via proxy...');
        console.log('Request URL:', apiUrl);
        
        const requestData = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        };
        
        console.log('Request Data:', JSON.stringify(requestData, null, 2));
        
        // 发送请求
        const response = await axios.post(
            apiUrl,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'Accept-Encoding': 'identity',
                    'Accept-Language': 'zh-CN,zh;q=0.9'
                },
                timeout: 60000
            }
        );
        
        console.log('DeepSeek API Response received:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        
        // 检查响应数据格式
        if (response.data && response.data.choices && Array.isArray(response.data.choices)) {
            return response.data;
        } else {
            console.error('Unexpected response data format:', response.data);
            throw new Error('Invalid response format from DeepSeek API');
        }
    } catch (error) {
        console.error('DeepSeek API Error:', error);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
            console.error('Response Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received from DeepSeek API. Request details:', error.request);
        } else {
            console.error('Request error:', error.message);
        }
        
        // 如果API失败，提供友好的错误信息
        const errorMessage = error.response ? 
            `${error.response.status}: ${JSON.stringify(error.response.data)}` : 
            error.message;
            
        throw new Error('无法连接到DeepSeek API。请检查网络连接或API密钥设置。\n\n错误详情：' + errorMessage);
    }
};

// Export default for backward compatibility
export default { getAICode }