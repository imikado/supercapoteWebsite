<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;
use MyWebsite\Pages\ComicsPage;
use MyWebsite\Pages\GamesPage;
use MyWebsite\Pages\GoodiesPage;
use MyWebsite\Pages\HomePage;
use MyWebsite\Pages\ShopPage;

class NavComponent extends ComponentAbstract implements ComponentInterface
{

    protected $pageSelected;

    public function __construct($pageSelected)
    {
        $this->pageSelected = $pageSelected;
    }

    public function render(): string
    {
        $linkList = [
            'Accueil' => HomePage::FILENAME,
            'Jeux' => GamesPage::FILENAME,
            'Bds' => ComicsPage::FILENAME,
            'Goodies' => GoodiesPage::FILENAME,
            'Boutique' => ShopPage::FILENAME,


        ];

        return $this->renderViewWithParamList(
            __DIR__ . '/Nav/nav.php',
            [
                'linkList' => $linkList,
                'pageSelected' => $this->pageSelected
            ]
        );
    }
}
