<ul class="grid">
    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>
        <li>
            <a class="card" href="<?php echo htmlspecialchars($itemLoop->href) ?>" target="_blank" rel="noopener">
                <span class="card-media square">
                    <img src="<?php echo $itemLoop->image ?>" alt="<?php echo htmlspecialchars($itemLoop->name) ?>" loading="lazy">
                </span>
                <span class="card-body">
                    <h3><?php echo htmlspecialchars($itemLoop->name) ?></h3>
                    <span class="btn btn-sm">Voir sur la boutique ↗</span>
                </span>
            </a>
        </li>
    <?php endforeach; ?>
</ul>

<p class="section"><a class="btn btn-red" href="https://supercapote.myspreadshop.fr" target="_blank" rel="noopener">Toute la boutique Supercapote ↗</a></p>
