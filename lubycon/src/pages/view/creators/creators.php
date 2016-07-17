
<link href="./pages/view/creators/creators.css" rel="stylesheet" type="text/css" />
<script src="./component/view/creator_card/creator_card.tmpl.js" type="text/javascript"></script>
<script type="text/javascript" src="./service/controller/infinite_scroll/infinite_scroll_module.js"></script>
<script type="text/javascript" src="./pages/controller/creators/creators_page_renderer.js"></script>

<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>CREATORS</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->
<!-- contents page css -->
<section class="container">
    <section class="nav_guide">
        <div class="nav-wrapper">
            <select class="locationFilter" data-param="location">
                <option>All Continents</option>
                <option>Africa</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
                <option>Oceania</option>
            </select>
            <select class="jobFilter" data-param="job">
				<!-- THIS IS TEST VALUES, IT WILL BE CHANGED JSON -->
                <option>Student</option>
				<option>Developer</option>
				<option>Designer</option>
				<option>Sex master</option>
            </select>
            <select class="userFilter" data-param="filter">
                <option>New</option>
                <option>Most Like</option>
                <option>Most Download</option>
                <option>Most Comment</option>
            </select>
            <div id="sub_search_bar" class="search-bar">
                <div class="select-box">
                    <select class="searchFilter" data-param="search_filter">
                        <option value="Name">Name</option>
                        <option value="Country">Country</option>
                    </select>
                </div>
                <input type="text" class="search-bar-text" value="Enter the keyword" />
                <button class="search-btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </section>
    <!-- end nav_guide -->
    <section class="con_wrap">
        <div id="user_view_main" class="con_main">
            <ul id="creator_card_wrap">
                <!--CREATOR CARD-->
            </ul>
        </div><!--con_main-->
    </section><!--user_box_total-->
</section>
<!--contents section -->
