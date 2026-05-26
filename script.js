/* ===== Tab 切换 ===== */
document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
        const panelId = btn.dataset.tab;
        document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`panel-${panelId}`).classList.add('active');
    });
});
