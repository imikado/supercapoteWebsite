<nav>
    <div class="nav-wrapper deep-purple darken-5 logo">
        <a href="#" class="brand-logo">Supercapote<sup>.com</sup></a>


        <ul id="nav-mobile" class="sidenav" style="transform: translateX(-105%);">

            <?php foreach ($this->paramList['linkList'] as $label => $link) : ?>
                <li <?php if ($link == $this->paramList['pageSelected']) : ?>class="active" <?php endif; ?>><a href="<?php echo $link ?>"><?php echo $label ?></a></li>
            <?php endforeach; ?>


        </ul>


        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <?php foreach ($this->paramList['linkList'] as $label => $link) : ?>
                <li <?php if ($link == $this->paramList['pageSelected']) : ?>class="active" <?php endif; ?>><a href="<?php echo $link ?>"><?php echo $label ?></a></li>
            <?php endforeach; ?>

        </ul>

        <a style="float:right" href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>



    </div>
</nav>