<?php
$title = $this->paramList['title'] ?? '';
$description = $this->paramList['description'] ?? "Supercapote, le héros du quotidien qui vous protège des IST et vous aide dans votre contraception.";
$fullTitle = ($title !== '' ? $title . ' · ' : '') . 'Supercapote.com';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo htmlspecialchars($fullTitle) ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($description) ?>">
  <meta name="theme-color" content="#7b1fa2">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Supercapote.com">
  <meta property="og:title" content="<?php echo htmlspecialchars($fullTitle) ?>">
  <meta property="og:description" content="<?php echo htmlspecialchars($description) ?>">
  <meta property="og:image" content="https://supercapote.com/data/img/dl/supercapote_ne_vole_pas1024x768.png">
  <meta property="og:locale" content="fr_FR">

  <link rel="icon" type="image/png" href="css/images/logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=<?php echo date('YmdHis') ?>">

  <script src="js/site.js" defer></script>
</head>

<body>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <?php echo $this->paramList['nav']->render() ?>

  <main id="contenu">
    <div class="container">
      <?php foreach ($this->paramList['contentList'] as $contentLoop) :
        echo $contentLoop->render();
      endforeach; ?>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; <?php echo date('Y') ?> Supercapote.com &mdash; site généré avec <a href="https://github.com/imikado/dupotStaticGenerationFramework" target="_blank" rel="noopener">dupot/static-generation-framework</a></p>
      <p>Une question ? <a href="https://www.sida-info-service.org/" target="_blank" rel="noopener">Sida Info Service</a> : 0 800 840 800 (gratuit, anonyme)</p>
    </div>
  </footer>

  <dialog class="viewer" id="viewer" aria-labelledby="viewer-title">
    <div class="viewer-bar">
      <h2 id="viewer-title"></h2>
      <button class="btn btn-sm" type="button" data-close>Fermer ✕</button>
    </div>
    <div class="viewer-content"></div>
  </dialog>
</body>

</html>