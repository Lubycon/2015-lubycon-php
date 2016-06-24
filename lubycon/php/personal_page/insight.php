<script src="<?=$one_depth?>/js/chart/amcharts.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/chart/serial.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/chart/lubytheme.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/insight.js" type="text/javascript"></script>

<?php
    $var1 = 42;
    $var2 = 45;
?>

<!--graph script-->
<div id="information_inbody">
    <ul id="dashboard_wrap">
        <li class="dash_section" id="creator_month">
            <div class="dash_header">
                <h4>TITLE</h4>
            </div>
            <div class="dash_body">
                <div class="dash_body_sector" id="userjob">
                    <p class="dash_body_title">title1</p>
                    <div class="dash_body_content">
                        <p class="content_text"><?=$var1?></p>
                    </div>
                </div>
                <div class="dash_body_sector" id="user_position">
                    <p class="dash_body_title">title2</p>
                    <div class="dash_body_content">
                        <p class="content_text"><?=$var2?></p> 
                    </div>
                </div>
                <div class="dash_body_sector" id="user_location">
                    <p class="dash_body_title">title3</p>
                    <div class="dash_body_content">
                        <p class="content_text"></p>
                        <p class="content_text"><?=$var1?></p>
                    </div>
                </div>
                <div class="dash_body_sector" id="user_language">
                    <p class="dash_body_title">title4</p>
                    <div class="dash_body_content">
                        <p class="content_text"><?=$var2?>,</p>
                        <p class="content_text"><?=$var1?></p>
                    </div>
                </div>
            </div>    
        </li> 
        <li class="dash_section" id="creator_month">
            <div class="dash_header">
                <h4>GRAPHS</h4>
            </div>
            <div class="dash_body">
                <div id="insight_box">
                    <div class="chart_wrap">
                        <div class="chartboxes" id="chartdiv1" style="width: 100%; height: 450px;"></div>
                        <div class="chartboxes" id="chartdiv2" style="width: 100%; height: 450px;"></div>
                        <div class="chartboxes" id="chartdiv3" style="width: 100%; height: 450px;"></div>
                        <div class="chartboxes" id="chartdiv4" style="width: 100%; height: 450px;"></div> 
                    </div>   
                </div>
            </div>    
        </li>         
    </ul>
</div>
<!-- end contents section -->

