<script src="<?=$one_depth?>/js/chart/amcharts.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/chart/serial.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/chart/lubytheme.js" type="text/javascript"></script>
<script src="<?=$one_depth?>/js/insight.js" type="text/javascript"></script>

<!--graph script-->

<div id="contents">
    <div id="insight_box">
        <div class="chart_wrap">
            <div class="chart_title">
                <i id="chart_icon" class="fa fa-heart"></i>
                <span id="chart_name">Like</span>
                <i id="toggle_arrow" class="fa fa-caret-down"></i>
            </div>
            <div id="chart_selector">
                <ul>
                    <li class="chart_list" data-target="chartdiv1"><i class="fa fa-heart"></i>Like</li>
                    <li class="chart_list" data-target="chartdiv2"><i class="fa fa-eye"></i>View</li>
                    <li class="chart_list" data-target="chartdiv3"><i class="fa fa-cloud-upload"></i>Uploaded</li>
                    <li class="chart_list" data-target="chartdiv4"><i class="fa fa-cloud-download"></i>Downloaded</li>
                </ul>
            </div><!--select chart-->
            <div class="chartboxes" id="chartdiv1" style="width: 100%; height: 450px;"></div>
            <div class="chartboxes" id="chartdiv2" style="width: 100%; height: 450px;"></div>
            <div class="chartboxes" id="chartdiv3" style="width: 100%; height: 450px;"></div>
            <div class="chartboxes" id="chartdiv4" style="width: 100%; height: 450px;"></div> 
        </div>   
        <link href="<?=$one_depth?>/css/insight.css" rel="stylesheet" type="text/css" />
        <!-- personal page css -->
        
        <!--graph script-->
    </div>
    <!-- end contents box -->
</div>
<!-- end contents section -->

