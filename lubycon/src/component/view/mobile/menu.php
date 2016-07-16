<script src="./component/controller/mobile/menu_renderer.js" type="text/javascript"></script>
<aside id="mb-menu-panel" class="visible-mb"><!--mobile panel menu-->
    <header id="mb-user-section">
        <div id="mb-after-signin" class="after_signin_class">
            <figure id="mb-user-pic">
                <img src="#"></img>
            </figure>
            <span id="mb-user-info">
                <span id="mb-user-name"></span>
                <span id="mb-user-location"><i class="fa fa-map-marker"></i></span>
            </span>
            <span id="mb-user-setting">
                <a href="#">
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
    <ul class="mb-menu-group after_signin_class" id="mb-menu-mypage">
        <p class="mb-menu-title">MY PAGE</p>
        <li class="mb-menu-list" data-value="dashboard">
            <a href="#">
                <i class="fa fa-tachometer fa-1x"></i>Dashboard
            </a>
        </li>
        <li class="mb-menu-list" data-value="insight">
            <a href="#">
                <i class="fa fa-line-chart fa-1x"></i>Insight
            </a>
        </li>
        <li class="mb-menu-list" data-value="my_contents">
            <a href="#">
                <i class="fa fa-line-chart fa-1x"></i>My Contents
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