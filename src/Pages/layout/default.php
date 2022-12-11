<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Supercapote.com</title>

  <script src="js/main.js" type="text/javascript"></script>

  <script src="js/jeux.js" type="text/javascript"></script>


  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

  <style>
    .logo {
      background: url('css/images/logo.png') no-repeat 0px center;
      padding-left: 55px;
    }


    #popup {
      position: absolute;
      background: #FFF;
      border: 3px solid #444;
      top: 10px;
      left: 40px;
    }

    #popup a {
      color: white;
    }

    #popup p {
      background: #444;
      margin: 0px;
      text-align: right;
      padding-right: 3px;
    }

    .main {
      min-height: 500px;
    }
  </style>
</head>

<body>

  <?php echo $this->paramList['nav']->render() ?>

  <div class="header">&nbsp;</div>

  <div class="main">
    <div class="container">


      <?php foreach ($this->paramList['contentList'] as $contentLoop) :
        echo $contentLoop->render();
      endforeach; ?>

    </div>

  </div>
  <div id="popup" style="display:none;">
    <p><a href="jeux.html">Fermer</a></p>
    <iframe style="border:0px" id="gamesrc"></iframe>
  </div>
  </div>


  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

  <script>
    (function($) {
      $(function() {
        $('.sidenav').sidenav();
      }); // end of document ready
    })(jQuery);
  </script>


</body>

</html>

<!--cache -->