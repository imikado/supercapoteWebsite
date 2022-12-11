<div class="row">


    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>



        <div class="col s12 m3">
            <div class="card">
                <div class="card-image">
                    <img src="<?php echo $itemLoop->path . '/' . $itemLoop->image ?>">
                </div>

                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Téléchargements<i class="material-icons right">more_vert</i></span>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Téléchargements<i class="material-icons right">close</i></span>

                    <div class="collection">

                        <?php foreach ($itemLoop->linkList as $variantLoop => $linkLoop) : ?>
                            <a class="collection-item center-align" target="_blank" href="<?php echo $linkLoop ?>"><?php echo $variantLoop ?></a>

                        <?php endforeach ?>
                    </div>
                </div>

            </div>
        </div>



    <?php endforeach; ?>


</div>