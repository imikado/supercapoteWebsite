<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class WallpaperListComponent extends ComponentAbstract implements ComponentInterface
{
    const PATH = 'data/img/dl/';

    public function render(): string
    {

        $wallpaperList = [];

        $filesList = scandir(__DIR__ . '/../../docs/' . self::PATH);
        foreach ($filesList as $fileLoop) {

            if (substr($fileLoop, -5) != 'Small') continue;

            $wallpaperList[] = new Wallpaper(self::PATH, basename($fileLoop));
        }

        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/wallpaperList.php',
            [
                'itemList' => $wallpaperList
            ]
        );
    }
}




class Wallpaper
{

    public $path;
    public $image;

    public $linkList = [];

    public function __construct($path, $image)
    {
        $this->path = $path;
        $this->image = $image;

        foreach (['1024x768', '1280x1024', '1365x1024', '1600x1200'] as $variant) {
            $variantImage = $this->path . '/' . str_replace('Small', $variant, $this->image) . '.png';
            if (file_exists(__DIR__ . '/../../docs/' . $variantImage)) {
                $this->linkList[$variant] = $variantImage;
            }
        }
    }
}
