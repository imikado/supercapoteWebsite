<header class="site-header">
    <div class="container">
        <a href="index.html" class="brand">
            <img src="css/images/logo.png" alt="" width="50" height="66">
            <span>Supercapote<small>.com</small></span>
        </a>

        <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            </svg>
        </button>

        <nav class="site-nav" id="site-nav" aria-label="Navigation principale">
            <ul>
                <?php foreach ($this->paramList['linkList'] as $label => $link) : ?>
                    <li><a href="<?php echo $link ?>" <?php if ($link == $this->paramList['pageSelected']) : ?>aria-current="page" <?php endif; ?>><?php echo $label ?></a></li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </div>
</header>
