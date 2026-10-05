<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class WallpaperListComponent extends ComponentAbstract implements ComponentInterface
{
    const PATH = 'data/img/dl/';

    const NAME_LIST = [
        'je-ne-suis-pas-ton-pere_Small' => 'Je ne suis pas ton père',
        'meme-bat-a-besoin-de-moi_Small' => 'Même Bat a besoin de moi',
        'supercapote-et-dentifrice_Small' => 'Supercapote & Dentifrice',
        'supercapote_haltereSmall' => 'Haltères',
        'supercapote_mercipublicSmall' => 'Merci public',
        'supercapote_ne_vole_pasSmall' => 'Ne vole pas',
        'supercapote_pasfaitmarmottesSmall' => 'Pas fait pour les marmottes',
        'supercapote_votreprotectionrapprocheeSmall' => 'Votre protection rapprochée',
    ];

    public function render(): string
    {

        $wallpaperList = [];

        $filesList = scandir(__DIR__ . '/../../docs/' . self::PATH);
        sort($filesList);
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

    public $name;
    public $preview;
    public $linkList = [];

    public function __construct($path, $image)
    {
        $this->path = $path;
        $this->image = $image;

        foreach (['1024x768', '1280x1024', '1365x1024', '1600x1200'] as $variant) {
            $variantImage = $this->path . str_replace('Small', $variant, $this->image) . '.png';
            if (file_exists(__DIR__ . '/../../docs/' . $variantImage)) {
                $this->linkList[$variant] = $variantImage;
            }
        }

        $this->preview = reset($this->linkList) ?: $this->path . $this->image;

        if (isset(WallpaperListComponent::NAME_LIST[$this->image])) {
            $this->name = WallpaperListComponent::NAME_LIST[$this->image];
        } else {
            $this->name = ucfirst(trim(str_replace(['supercapote_', 'Small', '_', '-'], ['', '', ' ', ' '], $this->image)));
        }
    }
}
