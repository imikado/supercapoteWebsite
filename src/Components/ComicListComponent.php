<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class ComicListComponent extends ComponentAbstract implements ComponentInterface
{
    const PATH = 'data/img/comicstrip/';

    public function render(): string
    {

        $comicList = [];

        $filesList = scandir(__DIR__ . '/../../docs/data/img/comicstrip');
        natsort($filesList);
        foreach ($filesList as $fileLoop) {
            if (substr($fileLoop, 0, 1) == '.') continue;

            $comicList[] = new Comic(self::PATH, basename($fileLoop), count($comicList) + 1);
        }

        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/comicList.php',
            [
                'itemList' => $comicList
            ]
        );
    }
}




class Comic
{

    public $path;
    public $image;
    public $number;

    public function __construct($path, $image, $number)
    {
        $this->path = $path;
        $this->image = $image;
        $this->number = $number;
    }
}
