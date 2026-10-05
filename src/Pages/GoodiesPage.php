<?php

namespace MyWebsite\Pages;

use Dupot\StaticGenerationFramework\Page\PageAbstract;
use Dupot\StaticGenerationFramework\Page\PageInterface;
use MyWebsite\Components\DocumentListComponent;
use MyWebsite\Components\WallpaperListComponent;
use MyWebsite\Components\NavComponent;
use MyWebsite\Components\PageHeaderComponent;

class GoodiesPage extends PageAbstract implements PageInterface
{

    const FILENAME = 'goodies.html';

    public function getFilename(): string
    {
        return self::FILENAME;
    }

    public function render(): string
    {
        return $this->renderLayoutWithParamList(
            __DIR__ . '/layout/default.php',
            [
                'title' => 'Goodies',
                'description' => "Fonds d'écran Supercapote à télécharger et documents d'information.",
                'nav' => new NavComponent($this->getFilename()),
                'contentList' => [
                    new PageHeaderComponent('Goodies', "Des fonds d'écran à télécharger pour afficher votre héros du quotidien."),
                    new WallpaperListComponent(),
                    new DocumentListComponent(),
                ]
            ]
        );
    }
}
