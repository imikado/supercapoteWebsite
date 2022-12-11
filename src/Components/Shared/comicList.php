<script>
    function chooseBd(id) {
        a = getById('popup');
        if (a) {
            a.style.display = 'block';


            b = getById('imgsrc');
            b.src = '../data/img/comicstrip/' + id;
        }
    }
</script>
<style>
    #popup {
        background: #FFF;
        border: 3px solid #444;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
    }

    #popup a {
        color: white;
    }

    #popup p {
        background: #444;
        margin: 0px;
        text-align: right;
        padding-right: 3px;
    }
</style>
<div id="popup" style="display:none;cursor:pointer" onclick="this.style.display='none'">
    <p><a href="#">Fermer</a></p>
    <img id="imgsrc" src="" />
</div>


<div class="row">


    <?php foreach ($this->paramList['itemList'] as $itemLoop) : ?>


        <div class="col s12 ">
            <div class="card">
                <div class="card-image">
                    <img src="<?php echo $itemLoop->path . '/' . $itemLoop->image ?>">

                </div>


            </div>
        </div>


    <?php endforeach; ?>