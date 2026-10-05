<ul class="comic-list">
    <?php foreach ($this->paramList['itemList'] as $itemLoop) :
        $src = $itemLoop->path . $itemLoop->image;
        $title = 'BD n°' . $itemLoop->number;
    ?>
        <li>
            <figure class="comic">
                <button type="button" data-comic="<?php echo $src ?>" data-title="<?php echo $title ?>" aria-label="Agrandir la <?php echo $title ?>">
                    <img src="<?php echo $src ?>" alt="<?php echo $title ?>" width="550" height="200" loading="lazy">
                </button>
                <figcaption><?php echo $title ?></figcaption>
            </figure>
        </li>
    <?php endforeach; ?>
</ul>
