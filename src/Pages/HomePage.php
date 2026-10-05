<?php

namespace MyWebsite\Pages;

use Dupot\StaticGenerationFramework\Page\PageAbstract;
use Dupot\StaticGenerationFramework\Page\PageInterface;
use MyWebsite\Components\HomeWelcomeComponent;
use MyWebsite\Components\NavComponent;

class HomePage extends PageAbstract implements PageInterface
{
    const FILENAME = 'index.html';

    public function getFilename(): string
    {
        return self::FILENAME;
    }

    public function render(): string
    {
        return $this->renderLayoutWithParamList(
            __DIR__ . '/layout/default.php',
            [
                'description' => "Supercapote, le héros du quotidien qui vous protège des IST et vous aide dans votre contraception : jeux, BDs, fonds d'écran et boutique.",
                'nav' => new NavComponent($this->getFilename()),
                'contentList' => [
                    new HomeWelcomeComponent(),
                ]
            ]
        );
    }
}
