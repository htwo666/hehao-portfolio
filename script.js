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

/* ===== 自适应图片网格：统一高度，等比缩放 ===== */
function adjustAutoImgGrid() {
    document.querySelectorAll('.auto-img-grid').forEach(grid => {
        const figures = grid.querySelectorAll('figure');
        if (!figures.length) return;

        // 等所有图加载完再算
        const imgs = [...figures].map(f => f.querySelector('img'));
        const allLoaded = imgs.every(img => img.complete && img.naturalWidth > 0);
        if (!allLoaded) return;

        // 取最高的那张图作为基准高度（在容器宽度下等比缩放后的高度）
        const gridWidth = grid.offsetWidth;
        const gapTotal = 0.6 * 16 * (figures.length - 1); // gap 0.6rem
        const colWidth = (gridWidth - gapTotal) / figures.length;

        let maxRatio = 0; // 宽高比最大的 = 高度最矮的
        imgs.forEach(img => {
            const r = img.naturalWidth / img.naturalHeight;
            if (r > maxRatio) maxRatio = r;
        });

        // 用最矮的图决定高度，其他图等比缩到同高但更窄
        const targetHeight = colWidth / maxRatio;

        figures.forEach((fig, i) => {
            const img = imgs[i];
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const figWidth = targetHeight * imgRatio;
            fig.style.width = figWidth + 'px';
            fig.style.height = targetHeight + 'px';
        });
    });
}

window.addEventListener('load', adjustAutoImgGrid);
window.addEventListener('resize', adjustAutoImgGrid);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.auto-img-grid img').forEach(img => {
        if (img.complete) adjustAutoImgGrid();
        else img.addEventListener('load', adjustAutoImgGrid);
    });
});