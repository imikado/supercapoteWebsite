<?php

namespace MyWebsite\Pages;

use Dupot\StaticGenerationFramework\Page\PageAbstract;
use Dupot\StaticGenerationFramework\Page\PageInterface;
use MyWebsite\Components\ComicListComponent;
use MyWebsite\Components\NavComponent;
use MyWebsite\Components\PageHeaderComponent;

class ComicsPage extends PageAbstract implements PageInterface
{

    const FILENAME = 'bds.html';

    public function getFilename(): string
    {
        return self::FILENAME;
    }

    public function render(): string
    {
        return $this->renderLayoutWithParamList(
            __DIR__ . '/layout/default.php',
            [
                'title' => 'BDs',
                'description' => "Les bandes dessinées de Supercapote, le super-héros qui ne sait pas voler.",
                'nav' => new NavComponent($this->getFilename()),
                'contentList' => [
                    new PageHeaderComponent('BDs', "Les aventures de Supercapote en strips. Cliquez sur une BD pour l'agrandir."),
                    new ComicListComponent(),
                ]
            ]
        );
    }
}
