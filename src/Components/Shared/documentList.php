<section class="section">
    <h2>Documents utiles</h2>
    <ul class="doc-list">
        <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>
            <li>
                <a href="<?php echo $itemLoop->href ?>" target="_blank">
                    <span class="doc-icon">PDF</span>
                    <span class="doc-text"><?php echo htmlspecialchars($itemLoop->name) ?><small><?php echo htmlspecialchars($itemLoop->description) ?></small></span>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</section>
