<link href="./component/view/chart/ammap/ammap.css" type="text/css" />

<script src="./component/view/chart/amcharts.js" type="text/javascript"></script>
<script src="./component/view/chart/serial.js" type="text/javascript"></script>
<script src="./component/view/chart/lubytheme.js" type="text/javascript"></script>
<script src="./component/view/chart/ammap.js" type="text/javascript"></script>
<script src="./component/view/chart/data/worldmap.js" type="text/javascript"></script>
<script src="./component/view/chart/pie.js" type="text/javascript"></script>
<script src="./component/view/chart/serial.js" type="text/javascript"></script>
<script src="./component/view/chart/light.js" type="text/javascript"></script>
<script src="./component/view/chart/lubytheme.js" type="text/javascript"></script>
<script src="./pages/controller/personal_page/insight_renderer.js" type="text/javascript"></script>

<!--graph script-->
<div id="information_inbody">
    <ul id="dashboard_wrap">
        <li class="dash_section">
            <div class="dash_header">
                <h4>GIVE &amp; TAKE</h4>
            </div>
            <div class="dash_body">
                <div class="dash_body_sector">
                    <div class="x2_inner" data-value="got">
                        <p class="dash_body_title">Like : I Got</p>
                        <div class="dash_body_content">
                            <p class="content_text"></p>
                        </div>
                    </div>
                    <div class="x2_inner" data-value="gave">
                        <p class="dash_body_title">Like : I Gave</p>
                        <div class="dash_body_content">
                            <p class="content_text"></p>
                        </div>
                    </div>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">Insight</p>
                    <div class="dash_body_content piechart">
                        <div class="chart-boxes" id="like-pie" style="width: 100%; height: 130px;"></div>
                    </div>
                </div>
                <div class="dash_body_sector">
                    <div class="x2_inner" data-value="got">
                        <p class="dash_body_title">Bookmark : I Got</p>
                        <div class="dash_body_content">
                            <p class="content_text"></p>
                        </div>
                    </div>
                    <div class="x2_inner" data-value="gave">
                        <p class="dash_body_title">Bookmark : I Gave</p>
                        <div class="dash_body_content">
                            <p class="content_text"></p>
                        </div>
                    </div>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">Insight</p>
                    <div class="dash_body_content piechart">
                        <div class="chart-boxes" id="bookmark-pie" style="width: 100%; height: 130px;"></div>
                    </div>
                </div>
            </div>
        </li>
        <li class="dash_section">
            <div class="dash_header">
                <h4>WHERE DO PEOPLE WHO LIKE MY CONTENTS?</h4>
            </div>
            <div class="dash_body" id="worldmap_body">
                <div class="dash_body_sector x3">
                    <div class="dash_body_content">
                        <div class="chart-boxes" id="worldmap" style="width: 75%; height: 300px;"></div>
                    </div>
                </div>
                <div class="dash_body_sector">
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
            </div>
        </li>
        <li class="dash_section">
            <div class="dash_header">
                <h4>TIMELINE</h4>
            </div>
            <div class="dash_body" id="timeline_body">
                <div id="dash_chart_wrap">
                    <div class="dash_body_sector x2">
                        <div class="chart-boxes">
                            <p class="dash_body_title">Like</p>
                            <div class="chart-canvas" id="like-timeline" style="width: 100%; height: 300px;"></div>
                        </div>
                    </div>
                    <div class="dash_body_sector x2">
                        <div class="chart-boxes">
                            <p class="dash_body_title">View</p>
                            <div class="chart-canvas" id="view-timeline" style="width: 100%; height: 300px;"></div>
                        </div>
                    </div>
                    <div class="dash_body_sector x2">
                        <div class="chart-boxes">
                            <p class="dash_body_title">Upload</p>
                            <div class="chart-canvas" id="up-timeline" style="width: 100%; height: 300px;"></div>
                        </div>
                    </div>
                    <div class="dash_body_sector x2">
                        <div class="chart-boxes">
                            <p class="dash_body_title">Download</p>
                            <div class="chart-canvas" id="down-timeline" style="width: 100%; height: 300px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="dash_section">
            <div class="dash_header">
                <h4>THE MOST POPULAR CONTENTS</h4>
            </div>
            <div class="dash_body" id="contents_rangking">
                <div class="dash_body_sector">
                    <p class="dash_body_title">Like</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">View</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">Comment</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
            </div>
        </li>
        <li class="dash_section">
            <div class="dash_header">
                <h4>THE MOST POPULAR FORUMS</h4>
            </div>
            <div class="dash_body" id="forums_rangking">
                <div class="dash_body_sector">
                    <p class="dash_body_title">Like</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">View</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
                <div class="dash_body_sector">
                    <p class="dash_body_title">Comment</p>
                    <ul class="dash_rank_list">
                        <li><span>1</span><p data-value="0"></p></li>
                        <li><span>2</span><p data-value="1"></p></li>
                        <li><span>3</span><p data-value="2"></p></li>
                        <li><span>4</span><p data-value="3"></p></li>
                        <li><span>5</span><p data-value="4"></p></li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>
<!-- end contents section -->
