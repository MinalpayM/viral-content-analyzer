// AI 分析模拟器 - 实际使用时可以接入真实 AI API
class ViralContentAnalyzer {
    constructor() {
        this.analysisCache = new Map();
        this.init();
    }

    init() {
        // 绑定事件
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyze());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateContent());
        document.getElementById('copyResultBtn').addEventListener('click', () => this.copyResult());
        
        // 示例链接自动填充
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.target.dataset.url;
                const textarea = document.getElementById('urlInput');
                textarea.value = url;
            });
        });
    }

    // 模拟 AI 分析（实际应用可替换为真实 API 调用）
    async analyze() {
        const urlInput = document.getElementById('urlInput');
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim());
        
        if (urls.length === 0) {
            this.showToast('请至少输入一个链接', 'error');
            return;
        }

        // 显示加载状态
        this.showLoading(true);
        document.getElementById('result').classList.add('hidden');

        try {
            // 模拟 AI 分析延迟
            await this.sleep(2000);
            
            // 生成分析结果
            const analysis = this.generateAnalysis(urls);
            
            // 显示结果
            this.displayAnalysis(analysis);
            this.showLoading(false);
            document.getElementById('result').classList.remove('hidden');
            
            // 保存分析结果供生成内容使用
            this.currentAnalysis = analysis;
            
            this.showToast('分析完成！', 'success');
        } catch (error) {
            this.showLoading(false);
            this.showToast('分析失败，请重试', 'error');
            console.error(error);
        }
    }

    // 生成分析内容（模拟 AI）
    generateAnalysis(urls) {
        const platform = this.detectPlatform(urls[0]);
        
        // 通用爆款分析模板
        const analysis = {
            platform: platform,
            title: this.generateTitle(urls[0]),
            keyPoints: [],
            emotionalTriggers: [],
            contentStructure: [],
            hashtags: [],
            tips: []
        };

        // 根据平台生成不同的分析
        if (platform === 'xiaohongshu') {
            analysis.keyPoints = [
                '🎯 **标题党技巧**：使用数字、疑问句和悬念，如"我发现了99%人都不知道的秘密"',
                '📸 **视觉冲击**：首图占比70%以上，使用高饱和度色彩和对比强烈的排版',
                '💬 **情感共鸣**：开头直击痛点，如"月薪3000如何精致生活"',
                '✨ **干货密度**：每篇至少3-5个实用技巧，配emoji分段',
                '🔑 **关键词布局**：标题和正文前100字包含核心搜索词'
            ];
            
            analysis.emotionalTriggers = [
                '焦虑感："再不这样做就晚了"',
                '获得感："学会这3招立省1000元"',
                '好奇心："原来明星都在偷偷用这个"',
                '归属感："infp都懂的5个瞬间"'
            ];
            
            analysis.contentStructure = [
                '1. **钩子开头**：前3秒抓住注意力（痛点/反常识/悬念）',
                '2. **身份认同**：快速建立目标人群共鸣',
                '3. **干货输出**：分点列举，每点配emoji',
                '4. **效果展示**：前后对比/数据支撑',
                '5. **互动引导**：结尾提问+话题标签'
            ];
            
            analysis.hashtags = ['#干货分享', '#种草', '#经验分享', '#变美小技巧'];
            
            analysis.tips = [
                '✅ 发布时间：工作日晚上8-10点，周末下午2-4点',
                '✅ 互动技巧：评论区前30分钟积极回复，增加权重',
                '✅ 标签策略：1个热门+2个中等+1个精准标签'
            ];
        } else if (platform === 'wechat') {
            analysis.keyPoints = [
                '📰 **标题公式**：痛点+解决方案+数字，如"月薪3000到30000，我只做了这3件事"',
                '📖 **深度内容**：1500-3000字，提供完整解决方案',
                '🔗 **金句频出**：每500字一个记忆点，便于转发',
                '📊 **数据背书**：引用权威数据/案例增加可信度',
                '🎨 **排版美学**：段落间距1.75，配图比例3:4'
            ];
            
            analysis.emotionalTriggers = [
                '认同感："说的不就是我吗"',
                '希望感："原来我也可以"',
                '焦虑感："再不学习就落后了"',
                '责任感："为了家人必须看"'
            ];
            
            analysis.contentStructure = [
                '1. **场景切入**：讲故事或描述痛点场景',
                '2. **数据分析**：用数据说明问题严重性',
                '3. **解决方案**：分3-5个步骤详细讲解',
                '4. **案例佐证**：真实成功案例增强说服力',
                '5. **行动号召**：关注/在看/转发引导'
            ];
            
            analysis.hashtags = ['#爆款文章', '#写作技巧', '#内容创作'];
            
            analysis.tips = [
                '✅ 转发时机：文章发布后1小时内转发3-5个群激活',
                '✅ 在看引导：文末加"点个在看，支持一下"',
                '✅ 系列化运营：做成系列文章增加粘性'
            ];
        } else {
            analysis.keyPoints = [
                '🎯 **抓住注意力**：开头3秒必须击中痛点或制造好奇',
                '💎 **价值密度**：每100字至少一个实用信息点',
                '📱 **移动优先**：短句+段落+emoji，便于手机阅读',
                '⚡ **情绪驱动**：激发强烈情绪（惊讶/愤怒/感动）',
                '🔄 **易传播性**：设计金句便于截图分享'
            ];
            
            analysis.emotionalTriggers = [
                'Wow Moment："竟然还能这样"',
                'FOMO心理："别人都知道了"',
                '共情时刻："终于有人说出我的心声"'
            ];
        }

        return analysis;
    }

    // 生成同款内容
    async generateContent() {
        if (!this.currentAnalysis) {
            this.showToast('请先分析爆款内容', 'error');
            return;
        }

        const contentType = document.getElementById('contentType').value;
        const topic = document.getElementById('topic').value.trim();
        
        if (!topic) {
            this.showToast('请输入内容主题/关键词', 'error');
            return;
        }

        const generateBtn = document.getElementById('generateBtn');
        generateBtn.disabled = true;
        generateBtn.textContent = '⏳ AI 创作中...';

        try {
            await this.sleep(1500);
            
            const generatedContent = this.createContent(contentType, topic);
            
            const resultDiv = document.getElementById('generationResult');
            resultDiv.innerHTML = `
                <h4>✨ 生成的爆款内容</h4>
                <div style="white-space: pre-wrap; line-height: 1.6;">${generatedContent}</div>
                <button onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText)" 
                        style="margin-top: 15px; padding: 8px 16px; background: #4ecdc4; border: none; border-radius: 6px; cursor: pointer;">
                    📋 复制内容
                </button>
            `;
            resultDiv.classList.remove('hidden');
            
            this.showToast('内容生成成功！', 'success');
        } catch (error) {
            this.showToast('生成失败，请重试', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '🚀 生成同款爆火内容';
        }
    }

    // 创建内容
    createContent(type, topic) {
        if (type === 'xiaohongshu') {
            return this.createXiaohongshuContent(topic);
        } else if (type === 'wechat') {
            return this.createWechatContent(topic);
        } else {
            return this.createGeneralContent(topic);
        }
    }

    createXiaohongshuContent(topic) {
        const titles = [
            `我发现了${topic}的终极秘密！99%的人都不知道`,
            `🔥私藏分享！${topic}这样做效果翻倍`,
            `月薪3000也能${topic}？我不允许你不知道`,
            `亲测有效！关于${topic}的5个冷知识`
        ];
        
        return `【标题】${titles[Math.floor(Math.random() * titles.length)]}

【正文】
姐妹们！我终于找到了${topic}的正确打开方式😭

先说说我的情况：之前一直为${topic}发愁，试了好多方法都没用...

直到我发现了这3个宝藏技巧：

✨技巧1：每天坚持15分钟，效果肉眼可见
✨技巧2：一定要选对工具，我用的是...
✨技巧3：搭配这个小习惯，事半功倍

📝干货总结：
✅ 第1点：...
✅ 第2点：...
✅ 第3点：...

💡小贴士：新手可以从最简单的开始，不要贪多

你们还有什么${topic}的好方法吗？评论区告诉我吧～

#${topic} #干货分享 #经验分享 #变美小技巧 #种草`;
    }

    createWechatContent(topic) {
        return `【标题】深度揭秘：${topic}的真相，看懂的人已经赢了

【正文】

> 你是否也曾为${topic}而困扰？
> 今天这篇文章，可能改变你的认知...

一、为什么${topic}这么重要？

（插入痛点场景描述，引发共鸣）

二、90%的人都做错了这3点

1. 误区一：...
2. 误区二：...
3. 误区三：...

三、正确的${topic}打开方式（建议收藏）

📌 步骤1：准备阶段
📌 步骤2：执行阶段  
📌 步骤3：优化阶段

四、真实案例分享

案例1：小王通过这个方法，3个月...
案例2：...

五、写在最后

${topic}不是一蹴而就的，但只要你按照上面的方法坚持30天，一定会看到改变。

如果这篇文章对你有帮助，请点个"在看"，让更多人看到❤️

#${topic} #深度好文 #干货分享`;
    }

    createGeneralContent(topic) {
        return `【爆款标题】关于${topic}，这5个真相你必须知道！

【开头】
你是不是也这样？
（描述3个痛点场景）

别担心，今天一次性给你讲透${topic}！

【正文亮点】
💎 亮点1：80%人都不知道的${topic}内幕
💎 亮点2：实操性极强的3个方法
💎 亮点3：小成本大效果的秘诀

【金句】
"${topic}的本质，是认知的变现"

【行动指南】
现在就开始：
1. 先做这件事...
2. 再完成这个...
3. 最后...

【互动】
你觉得${topic}最难的是什么？评论区聊聊～`;
    }

    // 显示分析结果
    displayAnalysis(analysis) {
        const container = document.getElementById('analysisResult');
        container.innerHTML = `
            <h3>📱 平台识别：${analysis.platform === 'xiaohongshu' ? '小红书' : analysis.platform === 'wechat' ? '微信公众号' : '通用平台'}</h3>
            
            <h3>🔑 爆款核心密码</h3>
            <ul>${analysis.keyPoints.map(point => `<li>${point}</li>`).join('')}</ul>
            
            <h3>💖 情绪触发点</h3>
            <ul>${analysis.emotionalTriggers.map(trigger => `<li>${trigger}</li>`).join('')}</ul>
            
            <h3>📝 内容结构拆解</h3>
            <ol>${analysis.contentStructure.map(structure => `<li>${structure}</li>`).join('')}</ol>
            
            <h3>🏷️ 推荐话题标签</h3>
            <p>${analysis.hashtags.join(' ')}</p>
            
            <h3>💡 创作建议</h3>
            <ul>${analysis.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        `;
    }

    // 工具函数
    detectPlatform(url) {
        if (url.includes('xiaohongshu')) return 'xiaohongshu';
        if (url.includes('mp.weixin.qq.com')) return 'wechat';
        return 'general';
    }

    generateTitle(url) {
        const titles = [
            '为什么这篇能成为爆款？深度拆解',
            '10w+背后的秘密，全在这里',
            '爆款内容的底层逻辑分析'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    async copyResult() {
        const content = document.getElementById('analysisResult').innerText;
        try {
            await navigator.clipboard.writeText(content);
            this.showToast('复制成功！', 'success');
        } catch (err) {
            this.showToast('复制失败', 'error');
        }
    }

    showLoading(show) {
        const loadingDiv = document.getElementById('loading');
        if (show) {
            loadingDiv.classList.remove('hidden');
        } else {
            loadingDiv.classList.add('hidden');
        }
    }

    showToast(message, type = 'info') {
        // 简易 toast 实现
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#51cf66' : type === 'error' ? '#ff6b6b' : '#4ecdc4'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ViralContentAnalyzer();
});