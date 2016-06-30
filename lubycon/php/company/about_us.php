<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>
<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Source+Serif+Pro' rel='stylesheet' type='text/css'>
<link href="<?=$one_depth?>/css/about_us.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../js/about_us.js"></script>

<div class="aboutus-wrapper">
    <div class="aboutus-header">
        <div class="aboutus-section figure">
            <img src="../../ch/img/about_us/4.jpg">
            <div class="title-wrapper main">
                <p class="section-title">HELLO WORLD</p>
                <p class="section-sub-title">Connect your creativity with the World</p>
                <p class="section-content">
                    <b>LUBYCON</b> is the online marketplace for every creators<br/>
                    Do you want to show your awesome works to other creators?</br/>
                    We can help you.
                </p>
                <div class="viewmore_bt"><a href="<?=$two_depth?>/contents/contents_page.php?cate=all&mid_cate=1&page=1">SHOW CONTENTS</a></div>
            </div>
        </div>
    </div>
    <div class="aboutus-body">
        <div class="aboutus-section">
            <div class="title-wrapper">
                <p class="section-title">OUR FOCUSES</p>
            </div>
            <div class="section-content">
                <ul>
                    <li class="focus-wrapper">
                        <figure class="focus-icon">
                            <img src="../../ch/img/about_us/design.png">
                        </figure>
                        <div class="focus-article">
                            <p class="focus-title">DESIGN</p>
                            <p class="descript">
                                All unique individuals are naturally born with the joy for creative process.
                                Show us your creation and tell us about your creative mind
                            </p>
                        </div>
                    </li>
                    <li class="focus-wrapper">
                        <figure class="focus-icon">
                            <img src="../../ch/img/about_us/share.png">
                        </figure>
                        <div class="focus-article">
                            <p class="focus-title">SHARE</p>
                            <p class="descript">
                                Discover other similar minds that connect to you and inspire other artists.
                                Connect your creativity with the World
                            </p>
                        </div>
                    </li>
                    <li class="focus-wrapper">
                        <figure class="focus-icon">
                            <img src="../../ch/img/about_us/community.png">
                        </figure>
                        <div class="focus-article">
                            <p class="focus-title">COMMUNITY</p>
                            <p class="descript">
                                Make new friends through your design.
                                The community exists to help and give you access to new information.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="aboutus-section">
            <div class="title-wrapper">
                <p class="section-title">AWESOME COLLABORATIONS</p>
                <p class="section-sub-title">Your works can be changed Artwork, Vector, 3D model whatever Anythings</p>
            </div>
            <div class="section-content">
                <p class="descript">
                    Aliquam? Adipiscing nunc a! Mattis amet tincidunt scelerisque! Purus cursus sit facilisis, phasellus lectus augue? Nec proin porttitor, aliquam facilisis pellentesque enim cursus, dis, ultrices aliquet ac urna pid mus, integer augue! Magna habitasse ac, eu, pulvinar ultrices tortor sociis tincidunt pid magnis, aliquam montes vel phasellus purus, porta magna tortor! Etiam, proin sagittis. Ac amet vel porttitor habitasse cursus! Auctor habitasse ultrices elementum, et, et auctor rhoncus, lacus hac? Sit sit, phasellus placerat penatibus? Natoque scelerisque risus? Egestas ultricies! Elementum a ridiculus sociis? Adipiscing, integer! Sociis nascetur in sociis tincidunt odio scelerisque tristique in placerat massa lundium. Porta eu, turpis massa augue enim, eros placerat urna phasellus? Nascetur nunc odio, rhoncus, egestas magna augue enim? Ac pid mid vel.
                </p>
                <div class="viewmore_bt"><a href="<?=$two_depth?>/creators_page/creators.php">FIND CREATORS</a></div>
            </div>
        </div>
        <div class="aboutus-section">
            <div class="title-wrapper">
                <p class="section-title">CONTACT US</p>
                <p class="section-sub-title">
                    If you have any questions, please feel free to contact us at
                    <a id="mailadress" href="mailto:contact@lubycon.com">contact@lubycon.com</a>
                </p>
            </div>
            <div class="section-content">
                <div class="viewmore_bt">
                    <a href="mailto:contact@lubycon.com" target="_blank">
                        <i class="fa fa-envelope-o"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    
</div>

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>