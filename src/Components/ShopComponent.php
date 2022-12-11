<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class ShopComponent extends ComponentAbstract implements ComponentInterface
{
    public function render(): string
    {

        $imagePath = 'css/images/shop';
        $shopUrl = 'https://supercapote.myspreadshop.fr/';

        $gameList = [
            new Item(
                $imagePath . '/supercapotedarkvador.jpg',
                $shopUrl . '/supercapotedarkvador-A5d6cf84be44742417a3ab2eb?productType=6&sellable=xrdO8kQ0dNu13e5yBGk8-6-7&appearance=4'
            ),
            new Item(
                $imagePath . '/supercapotecactus.jpg',
                $shopUrl . '/supercapotecactus-A5d6cf85d2225092663c45674?productType=6&sellable=R4n3zJrkXETn9mvQgYRw-6-7&appearance=4'
            ),
            new Item(
                $imagePath . '/supercapotedarkvadorgirl.jpg',
                $shopUrl . '/supercapotedarkvador-A5d6cf84be44742417a3ab2eb?productType=917&sellable=xrdO8kQ0dNu13e5yBGk8-917-16&appearance=348'
            ),


            new Item(
                $imagePath . '/supercapotedentifrice.jpg',
                $shopUrl . '/supercapote+dentifrice+heros+du+quotidien-A5d6cf828b264a14c272cf215?productType=6&sellable=92qdyQVdblUNx9AQpw1X-6-7&appearance=2'
            ),

            new Item(
                $imagePath . '/supercapotehalteres.jpg',
                $shopUrl . '/supercapote+le+heros+du+quotidien-A5d6cf8175fd3e40d5fccba88?productType=916&sellable=OwDE0oeoqMSZy4Ggex1j-916-15&appearance=2'
            ),

            new Item(
                $imagePath . '/supercapote-et-le-dentifrice-sont-les-heros-du-quotidien.jpg',
                $shopUrl . '/supercapote+dentifrice+heros+du+quotidien-A5d6cf8372225092663c41a57?productType=815&sellable=VRDwxgzeMrte4Jbd158j-815-9&appearance=2'
            ),


            new Item(
                $imagePath . '/supercapote-le-heros-du-quotidien.jpg',
                $shopUrl . '/supercapote-A5d6cf8705fd3e40d5fcd3a84?productType=114&sellable=OwDE0vkVEwiZy4GgeEnX-114-7&appearance=70'
            ),

            new Item(
                $imagePath . '/supercapote-le-super-heros-qui-ne-sait-pas-voler.jpg',
                $shopUrl . '/supercapote+ne+sait+pas+voler-A5d6cf82ee0c08361bd9d981e?productType=31&sellable=kawMglrxv1inaoM5EbZe-31-32&appearance=1&size=29'
            )









        ];

        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/cardList.php',
            [
                'itemList' => $gameList
            ]
        );
    }
}




class Item
{

    public $href;
    public $image;

    public function __construct($image, $href)
    {

        $this->image = $image;

        $this->href = $href;
    }
}
