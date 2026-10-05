<ul class="grid">
    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>
        <li>
            <div class="card">
                <a class="card-media" href="<?php echo $itemLoop->preview ?>" target="_blank">
                    <img src="<?php echo $itemLoop->preview ?>" alt="Fond d'écran <?php echo htmlspecialchars($itemLoop->name) ?>" loading="lazy">
                </a>
                <div class="card-body">
                    <h3><?php echo htmlspecialchars($itemLoop->name) ?></h3>
                    <div class="chips">
                        <?php foreach ($itemLoop->linkList as $variantLoop => $linkLoop) : ?>
                            <a class="btn btn-sm btn-alt" href="<?php echo $linkLoop ?>" download>⬇ <?php echo $variantLoop ?></a>
                        <?php endforeach ?>
                    </div>
                </div>
            </div>
        </li>
    <?php endforeach; ?>
</ul>
