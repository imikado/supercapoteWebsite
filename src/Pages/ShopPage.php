<?php

namespace MyWebsite\Pages;

use Dupot\StaticGenerationFramework\Page\PageAbstract;
use Dupot\StaticGenerationFramework\Page\PageInterface;
use MyWebsite\Components\NavComponent;
use MyWebsite\Components\PageHeaderComponent;
use MyWebsite\Components\ShopComponent;

class ShopPage extends PageAbstract implements PageInterface
{

    const FILENAME = 'shop.html';

    public function getFilename(): string
    {
        return self::FILENAME;
    }

    public function render(): string
    {
        return $this->renderLayoutWithParamList(
            __DIR__ . '/layout/default.php',
            [
                'title' => 'Boutique',
                'description' => "T-shirts et goodies Supercapote sur la boutique en ligne.",
                'nav' => new NavComponent($this->getFilename()),
                'contentList' => [
                    new PageHeaderComponent('Boutique', "T-shirts, sweats et accessoires Supercapote, en vente sur notre boutique Spreadshop."),
                    new ShopComponent(),
                ]
            ]
        );
    }
}
