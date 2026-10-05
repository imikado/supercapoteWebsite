<?php

namespace MyWebsite\Pages;

use Dupot\StaticGenerationFramework\Page\PageAbstract;
use Dupot\StaticGenerationFramework\Page\PageInterface;
use MyWebsite\Components\GameListComponent;
use MyWebsite\Components\NavComponent;
use MyWebsite\Components\PageHeaderComponent;

class GamesPage extends PageAbstract implements PageInterface
{

    const FILENAME = 'jeux.html';

    public function getFilename(): string
    {
        return self::FILENAME;
    }

    public function render(): string
    {
        return $this->renderLayoutWithParamList(
            __DIR__ . '/layout/default.php',
            [
                'title' => 'Jeux',
                'description' => "Des petits jeux rétro à lancer directement dans le navigateur.",
                'nav' => new NavComponent($this->getFilename()),
                'contentList' => [
                    new PageHeaderComponent('Jeux', "Échecs, morpion, Pac-Man, Snake, Tetris… choisissez un jeu et lancez la partie !"),
                    new GameListComponent(),
                ]
            ]
        );
    }
}
