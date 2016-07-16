
<aside id="mb-menu-panel" class="visible-mb"><!--mobile panel menu-->
    <header id="mb-user-section">
        <div id="mb-after-signin">
            <?php
                $userpic = "../../../Lubycon_Contents/user/$Loginuser_code/profile.jpg";
            ?>
            <figure id="mb-user-pic">
                <img src="<?=$userpic?>"></img>
            </figure>
            <span id="mb-user-info">
                <span id="mb-user-name"><?=$Loginuser_name?></span>
                <span id="mb-user-location"><i class="fa fa-map-marker"></i><?=$Loginuser_city?>, <?=$Loginuser_country?></span>
            </span>
            <span id="mb-user-setting">
                <a href="service/view/resist_password">
                <!--<?=$two_depth?>/personal_page/personal_page.php?cate=account_setting&usernum=<?=$Loginuser_code?>-->
                    <i class="fa fa-gear fa-1x"></i>
                </a>
            </span>
        </div> 
    </header>
    <ul class="mb-menu-group">
        <p class="mb-menu-title">CONTENTS</p>
        <li class="mb-menu-list">
            <a href="?dir=pages/controller/contents/contents_page&cate=artwork&page=1">
                <i class="fa fa-picture-o fa-1x"></i>Artwork
            </a>
        </li>
        <li class="mb-menu-list">
            <a href="?dir=pages/controller/contents/contents_page&cate=vector&page=1">
                <i class="fa fa-object-group fa-1x"></i>Vector
            </a>
        </li>
        <li class="mb-menu-list">
            <a href="?dir=pages/controller/contents/contents_page&cate=threed&page=1">
                <i class="fa fa-cube fa-1x"></i>3D Model
            </a>
        </li>
    </ul>
    <ul class="mb-menu-group">
        <p class="mb-menu-title">COMMUNITY</p>
        <li class="mb-menu-list">
            <a href="?dir=pages/view/creators/creators">
                <i class="fa fa-pencil fa-1x"></i>Creator
            </a>
        </li>
        <li class="mb-menu-list">
            <a href="?dir=pages/view/community/community_page&cate=forum">
               <i class="fa fa-comments-o fa-1x"></i>Forum
           </a>
        </li>
    </ul>
    <ul class="mb-menu-group">
        <p class="mb-menu-title">MY PAGE</p>
        <li class="mb-menu-list">
            <a href="?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=<?=$Loginuser_code?>">
                <i class="fa fa-tachometer fa-1x"></i>Dashboard
            </a>
        </li>
        <li class="mb-menu-list">
            <a href="?dir=pages/view/personal_page/personal_page&cate=insight&usernum=<?=$Loginuser_code?>">
                <i class="fa fa-line-chart fa-1x"></i>Insight
            </a>
        </li>
        <li class="mb-menu-list">
            <a href="?dir=pages/view/account_setting/account_setting">
                <i class="fa fa-gear fa-1x"></i>Account Setting
            </a>
        </li>
    </ul>
    <ul class="mb-menu-group signin_class">
        <li class="mb-menu-list">
            <a href="?dir=pages/view/sign_in/login_page">
                <i class="fa fa-power-off fa-1x"></i>Sign in
            </a>
        </li>
    </ul>
    <ul class="mb-menu-group after_signin_class">
        <li class="mb-menu-list">
            <a href="?dir=pages/view/sign_in/login_page">
                <i class="fa fa-power-off fa-1x"></i>Sign out
            </a>
        </li>
    </ul>
</aside>
<section class="mb-wrapper-main visible-mb">    
    <!--<section class="mb-section">
        <div class="mb-main-img-wrapper selected" data-value="artwork">
            <ul>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="../../asset/img/thumbnail/artwork/1.jpg" alt="content1" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="../../asset/img/thumbnail/artwork/2.jpg" alt="content2" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="../../asset/img/thumbnail/artwork/3.jpg" alt="content3" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="../../asset/img/thumbnail/artwork/4.jpg" alt="content4" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="../../asset/img/thumbnail/artwork/5.jpg" alt="content5" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="viewmore_bt">
                <a href="?dir=pages/controller/contents/contents_page&cate=artwork&page=1">VIEW MORE ARTWORK</a>
            </div>
        </div>
        <div class="mb-main-img-wrapper" data-value="vector">
            <ul>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/vector/1.jpg" alt="content1" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/vector/2.jpg" alt="content2" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/vector/3.jpg" alt="content3" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/vector/4.jpg" alt="content4" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/vector/5.jpg" alt="content5" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="viewmore_bt">
                <a href="?dir=pages/controller/contents/contents_page&cate=vector&page=1">VIEW MORE VECTOR</a>
            </div>
        </div>
        <div class="mb-main-img-wrapper" data-value="3d">
            <ul>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/3d/1.jpg" alt="content1" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/3d/2.jpg" alt="content2" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/3d/3.jpg" alt="content3" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/3d/4.jpg" alt="content4" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-main-img">
                    <a href="#">
                        <img src="./ch/img/thumbnail/3d/5.jpg" alt="content5" />
                        <div class="layer">
                            <div class="content-descript">
                                <p class="content-name">LOREM IPSUM</p>
                                <p class="creator-name">by <span>Simon Joseph</span></p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="viewmore_bt">
                <a href="?dir=pages/controller/contents/contents_page&cate=threed&page=1">VIEW MORE 3D MODEL</a>
            </div>
        </div>
    </section>-->
    <div id="mb-main-tab">
        <div class="mb-main-tab-wrapper">
            <div class="mb-main-tab-bt btn radioType selected" data-target="artwork">
                <i class="fa fa-picture-o"></i><span>ARTWORK</span>
            </div>
            <div class="mb-main-tab-bt btn radioType" data-target="vector">
                <i class="fa fa-object-group"></i><span>VECTOR</span>
            </div>
            <div class="mb-main-tab-bt btn radioType" data-target="3d">
                <i class="fa fa-cube"></i><span>3D MODEL</span>
            </div>
        </div>
    </div>
</section>