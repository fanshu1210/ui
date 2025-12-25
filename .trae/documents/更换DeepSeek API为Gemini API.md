1. 更新 `src/api/openai.js` 文件，修改API调用逻辑：
   - 更改API端点为Gemini API地址
   - 调整请求体格式以符合Gemini API要求
   - 更新响应解析逻辑
   - 修改API密钥使用方式（Gemini使用URL参数而非Authorization头）

2. 更新 `.env` 文件：
   - 将 `VITE_OPENAI_API_KEY` 的值替换为用户提供的Gemini API密钥

3. 确保代码兼容性：
   - 保持函数名和参数不变，确保调用处无需修改
   - 处理可能的错误情况
   - 确保返回格式一致