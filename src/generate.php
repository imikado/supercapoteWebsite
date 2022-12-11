<?php

use MyWebsite\Pages\ComicsPage;
use MyWebsite\Pages\GamesPage;
use MyWebsite\Pages\GoodiesPage;
use MyWebsite\Pages\HomePage;
use MyWebsite\Pages\ShopPage;

require __DIR__ . '/../vendor/autoload.php';

try {

    $pagesList = [

        new HomePage(),
        new GamesPage(),
        new ComicsPage(),
        new GoodiesPage(),
        new ShopPage()
        //new OtherPage()

    ];

    foreach ($pagesList as $pageLoop) {
        print("Generate " . $pageLoop->getFilename() . "\n");
        $pageLoop->generateTo(__DIR__ . '/../docs/');
    }
} catch (Exception $e) {

    print $e->getMessage();
}
