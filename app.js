const CONFIG = {
    token: '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',      // 替换为你的GitHub令牌
    owner: 'qdqlovezhl',   // GitHub用户名
    repo: 'blog-comments'     // 仓库名
};
document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: `${username}的留言`,
                body: content
            })
        });

        if (response.ok) {
            alert('留言成功！');
            loadMessages();
        }
    } catch (error) {
        console.error('提交失败:', error);
    }
});

async function loadMessages() {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues?state=all`,
            { headers: { 'Authorization': `token ${CONFIG.token}` } }
        );
        const messages = await response.json();

        const container = document.getElementById('messages');
        container.innerHTML = messages.map(msg => `
            <div class="message">
                <h3>${msg.title}</h3>
                <p>${msg.body.replace(/\n/g, '<br>')}</p>
                <small>${new Date(msg.created_at).toLocaleString()}</small>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载失败:', error);
    }
}

// 初始化加载留言
loadMessages();
