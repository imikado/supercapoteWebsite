<div class="row">


    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>
        <div class="col s12 m3">
            <div class="card">
                <div class="card-image">
                    <img src="<?php echo $itemLoop->image ?>">
                </div>
                <div class="card-content">
                    <p><?php echo $itemLoop->name ?></p>
                </div>
                <div class="card-action">
                    <?php if (isset($itemLoop->onclick)) : ?>
                        <a href="<?php echo $itemLoop->href ?>" onclick="<?php echo $itemLoop->onclick ?>">Jouer</a>
                    <?php else : ?>
                        <a href="<?php echo $itemLoop->href ?>" target="_blank">Acheter</a>

                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endforeach; ?>


</div>