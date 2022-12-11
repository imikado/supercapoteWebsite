<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class GameListComponent extends ComponentAbstract implements ComponentInterface
{
    public function render(): string
    {

        $imagePath = 'css/images/jeux';

        $gameList = [
            new Game('Echec', $imagePath . '/echec3.html.png', 'echec3.html', 320, 400),
            new Game('Morpion', $imagePath . '/morpion.html.png', 'morpion.html', 330, 388),
            new Game('Pacman', $imagePath . '/pacman.html.png', 'pacman.html', 360, 220),
            new Game('Snake', $imagePath . '/snake2.html.png', 'snake2.html', 414, 278),
            new Game('Tetris', $imagePath . '/tetris2.html.png', 'tetris2.html', 220, 400),
            new Game('ShootThemUp', $imagePath . '/shootthemup.html.png', 'shootthemup.html', 420, 424),
            new Game('Puissance4', $imagePath . '/puissance4.html.png', 'puissance4.html', 340, 410),
            new Game('Othello', $imagePath . '/othello.html.png', 'othello.html', 412, 394)


        ];

        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/cardList.php',
            [
                'itemList' => $gameList
            ]
        );
    }
}




class Game
{

    public $name;
    public $href = '#';
    public $onclick;
    public $image;

    public function __construct($name, $image, $link, $width, $height)
    {
        $this->name = $name;
        $this->image = $image;

        $this->onclick = "chooseGame('$link',$width,$height);return false";
    }
}
