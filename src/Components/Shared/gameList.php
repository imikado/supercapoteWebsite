<ul class="grid">
    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>
        <li>
            <button class="card" type="button"
                data-game="<?php echo htmlspecialchars($itemLoop->link) ?>"
                data-width="<?php echo $itemLoop->width ?>"
                data-height="<?php echo $itemLoop->height ?>"
                data-title="<?php echo htmlspecialchars($itemLoop->name) ?>">
                <span class="card-media contain">
                    <img src="<?php echo $itemLoop->image ?>" alt="" loading="lazy">
                </span>
                <span class="card-body">
                    <h3><?php echo htmlspecialchars($itemLoop->name) ?></h3>
                    <span class="btn btn-sm">▶ Jouer</span>
                </span>
            </button>
        </li>
    <?php endforeach; ?>
</ul>
