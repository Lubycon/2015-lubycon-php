<?php
class infinite_scroll extends json_control
{
    // from ajax post
    private $cardType;
    private $page;
    private $topCate;
    private $filter;
    private $sort;
    private $searchFilter;
    private $searchValue;
    private $nowPage;
    private $targetPage;

    // page limit option
    private $pageStartPoint;
    private $page_boundary;

    // content and forum allow top category list
    private $allow_array_list;
    private $allow_array_content = ['all','artwork','vector','threed'];
    private $allow_array_community = ['all','forum','tutorial','qaa'];



    private $searchFilterQuery;
    private $midCateQuery;
    private $licenseQuery;
    private $jobQuery;
    private $continentQuery;
    private $myBookmarkQuery;
    private $myContentQuery;


    public $select_query;
    public $from_query;
    public $where_query;
    public $order_query;
    public $limit_query;

    public $bind_data=array();

    public $ccDecode;

    /*
    private $page_kinds;
    private $top_category;
    private $top_cate_decode;
    private $middle_category;
    private $now_page;
    private $target_page;
    private $call_page;
    private $start_page;
    private $page_boundary;
    private $page_limit = 30;

    private $allow_array_list;
    private $allow_array_content = ['all','artwork','vector','threed'];
    private $allow_array_community = ['all','forum','tutorial','qaa'];

    private $filter; // array
    private $sort; // array

    public $where_query = " WHERE a.`contentStatus` = 'normal' AND "; // for query
    public $order_query = ' ORDER BY a.`contentDate` DESC '; // for query
    public $query;
    public $query_foundRow = "SELECT FOUND_ROWS()";
    
    public $all_page_count; //all page count
    */
	public function __construct($postData)
    {
		// default arg is page kind
		$this->cardType = $postData->cardType;
        $this->page = $postData->page;
        $this->topCate = $postData->topCate;
        $this->filter = $postData->filter;
        $this->sort = $postData->sort;
        $this->searchValue = $postData->searchValue;
        $this->nowPage = $postData->nowPage;
        $this->targetPage = $postData->targetPage;

        //optcion to call each
        $this->page_boundary = 30;
        $this->pageStartPoint = ($this->targetPage-1) * $this->page_boundary;

        //query set
        $this->searchFilterQuery = $this->searchValue !== null ? $this->filter->search." like '%".$this->searchValue."%'" : $this->filter->search = null ;
        $this->midCateQuery = $this->filter->midCate !== 'all' ? $this->filter->midCate.' IN (a.`midCategoryCode0`,a.`midCategoryCode1`,a.`midCategoryCode2`)' : null;
        $this->licenseQuery = $this->filter->license !== 'all' ? 'a.`ccLicense` = '.($this->filter->license) : null;
        $this->jobQuery = $this->filter->license !== 'all' ? 'a.`jobCode` = '.($this->filter->job) : null; 
        $this->continentQuery = $this->filter->license !== 'all' ? 'a.`continent` = '.($this->filter->continent) : null;
        $this->myBookmarkQuery;
        $this->myContentQuery;


         //set allow array form page kinds
        if($this->cardType == 'content')
        {
            $this->allow_array_list = $this->allow_array_content;
            $this->validateCategory();
        }
        else if($this->cardType == 'community')
        {
            $this->allow_array_list = $this->allow_array_community;
            $this->validateCategory();
        }


        $this->json_decode('ccCode',"../../../../data/ccCode.json");
        $this->ccDecode = $this->json_decode_code;
	}

    private function validateCategory() //check top category form allow array
    {
        if( !in_array($this->topCate , $this->allow_array_list) )
        {
            echo 'Unknown top category name errorCode:0001';
            die();
        }
    }

    public function initQuery($Loginuser_code) //set default query option
    {
        switch($this->cardType)
        {
            case 'content' :
                $this->select_query = 
                    "
                    SELECT SQL_CALC_FOUND_ROWS 
                    a.`boardCode`,a.`userCode`,a.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`,a.`ccLicense`,a.`downloadCount`,a.`commentCount`,
                    a.`viewCount`,a.`likeCount` , a.`midCategoryCode0`, a.`midCategoryCode1`, a.`midCategoryCode2` ,a.`contentStatus` , c.`nick` 
                    ";
                if($this->topCate === 'all')
                {
                    $this->from_query = 
                    "
                    FROM 
                    ( 
                        SELECT * FROM lubyconboard.`artwork`
                        LEFT JOIN lubyconboard.`artworkmidcategory`
                        USING (`boardCode`)
            
                        UNION SELECT * FROM lubyconboard.`vector` 
                        LEFT JOIN lubyconboard.`vectormidcategory`
                        USING (`boardCode`)
            
                        UNION SELECT * FROM lubyconboard.`threed` 
                        LEFT JOIN lubyconboard.`threedmidcategory`
                        USING (`boardCode`)
                    ) AS a 
                    LEFT JOIN lubyconuser.`userbasic` AS c 
                    ON a.`userCode` = c.`userCode` 
                    ";
                }else
                {
                    $this->from_query =
                    "
                        from 
                        (
                        SELECT * FROM lubyconboard.`$this->topCate`                 
                        LEFT JOIN lubyconboard.`$this->topCate"."midcategory`
                        USING (`boardCode`)
                        ) as a
                        left join lubyconuser.`userbasic` c
                        ON a.`userCode` = c.`userCode`
                    ";
                }

                $this->where_query = " WHERE a.`contentStatus` = 'normal' AND";

                if($Loginuser_code != null)
                {
                    $this->select_query .= " ,b.`bookmarkActionUserCode` ";
                    $this->from_query .= "LEFT JOIN lubyconboard.`contentsbookmark` AS b ON a.`boardCode` = b.`boardCode` AND a.`topCategoryCode` = b.`topCategoryCode` AND b.`bookmarkActionUserCode` = $Loginuser_code ";
                }

            break;
            case 'community' : break;
            case 'creator' : 
                $this->select_query =
                "SELECT  `userbasic`.`userCode` , `nick` , `jobCode` , `boardCode` , `city` , `countryCode` , `userDirectory`";
                $this->from_query=
                "
                FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` 
                INNER join lubyconuser.`userinfo` 
                ON `artwork`.`userCode` = `userbasic`.`userCode` 
                and `userbasic`.`userCode` = `userinfo`.`userCode` 
                ";
                $this->order_query=" ORDER BY `boardCode` DESC ";
            break;
            case 'comment' : break;
            default : die( 'initQuery switcher error' ); break;
        }
        $this->limit_query = " limit $this->pageStartPoint , $this->page_boundary";
    }

    public function setOption() //set query from user needs
    {
        foreach( $this->filter as $key => $value )
        {
            if( $value !== null && $value !== 'all' )
            {
                $addQuery = $this->{$key."Query"};
                $this->where_query .= " $addQuery and ";
            }
        }
        $this->where_query = substr($this->where_query, 0, -4);//delete last and string


        switch($this->sort)
        {
            case 0 : $this->order_query = " ORDER BY a.`viewCount` DESC "; break;
            case 1 : $this->order_query = " ORDER BY a.`contentDate` DESC "; break;
            case 2 : $this->order_query = " ORDER BY a.`likeCount` DESC "; break;
            case 3 : $this->order_query = " ORDER BY a.`downloadCount` DESC "; break;
            case 4 : $this->order_query = " ORDER BY a.`commentCount` DESC "; break;
            default : $this->order_query = " ORDER BY a.`contentDate` DESC "; break;
        }


        /*
        echo $this->select_query;
        echo $this->from_query;
        echo $this->where_query;
        echo $this->order_query;
        echo $this->limit_query;
        */
    }

    public function bindResult($result)
    {
        switch($this->cardType)
        {
            case 'content' :
                while( $row = mysqli_fetch_assoc($result) )
                {
                    $bookmark_check = isset($row['bookmarkActionUserCode']) ? 'true' : 'false';
                    $this->json_search($this->ccDecode,'name','ccLicense',$row['ccLicense']);
                    $license_check = $this->search_key;

                    $this->bind_data[] = array(
                        'code' => $row['boardCode'],
                        'title' => $row['contentTitle'],
                        'category' => $row['topCategoryCode'],
                        'thumbnail' => $row['userDirectory'].'/thumbnail/thumbnail.jpg',
                        'license' => $license_check,
                        'bookmark' => $bookmark_check,
                        'userData' => array(
                            'code' => $row['userCode'],
                            'name' => $row['nick'],
                            'profile' => "../../../../Lubycon_Contents/user/".$row['userCode']."/profile.jpg",
                        ),
                        'contentCount' => array(
                            'view' => $row['viewCount'],
                            'comment' => $row['commentCount'],
                            'like' => $row['likeCount'],
                        )
                    );
                }
            break;
            case 'community' : break;
            case 'creator' : break;
            case 'comment' : break;
            default : die( 'initQuery switcher error' ); break;
        }
    }


    /* need change logic to model
    public function set_query($query_user_code)
    {
        if( $this->top_category == 'all' )
        {
            $this->query = "
            SELECT SQL_CALC_FOUND_ROWS 
            a.`boardCode`,a.`userCode`,a.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`,a.`ccLicense`,a.`downloadCount`,a.`commentCount`,a.`viewCount`,a.`likeCount`, c.`nick`, a.`midCategoryCode0`, a.`midCategoryCode1`, a.`midCategoryCode2` ,a.`contentStatus`";
            if($query_user_code != '')
            {$this->query .= " ,b.`bookmarkActionUserCode` ";}
            $this->query .= 
            " FROM 
            ( 
                SELECT * FROM lubyconboard.`artwork`
                LEFT JOIN lubyconboard.`artworkmidcategory`
                USING (`boardCode`)
    
                UNION SELECT * FROM lubyconboard.`vector` 
                LEFT JOIN lubyconboard.`vectormidcategory`
                USING (`boardCode`)
    
                UNION SELECT * FROM lubyconboard.`threed` 
                LEFT JOIN lubyconboard.`threedmidcategory`
                USING (`boardCode`)
            ) AS a ";
            if($query_user_code != '')
            {
            $this->query .= "LEFT JOIN lubyconboard.`contentsbookmark` AS b 
            ON a.`boardCode` = b.`boardCode`
            AND a.`topCategoryCode` = b.`topCategoryCode`
            AND b.`bookmarkActionUserCode` = $query_user_code ";
            }
            $this->query .= "LEFT JOIN lubyconuser.`userbasic` AS c 
            ON a.`userCode` = c.`userCode` 

            $this->where_query
            $this->order_query
            limit $this->call_page,$this->page_boundary";
        
        }else
        {
            $this->query = "
            select SQL_CALC_FOUND_ROWS
            a.`boardCode`,a.`userCode`,a.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`,a.`ccLicense`,a.`downloadCount`,a.`commentCount`,a.`viewCount`,a.`likeCount`, c.`nick`, a.`midCategoryCode0`, a.`midCategoryCode1`, a.`midCategoryCode2` ,a.`contentStatus`";
            if($query_user_code != '')
            {$this->query .= " ,b.`bookmarkActionUserCode` ";}
            $this->query .= 
            " from 
                (
                SELECT * FROM lubyconboard.`$this->top_category`                 
                LEFT JOIN lubyconboard.`$this->top_category"."midcategory`
                USING (`boardCode`)
                ) as a
            ";
            if( $query_user_code != '' )
            {
                $this->query .= 
                "LEFT JOIN lubyconboard.`contentsbookmark` b
                ON a.`boardCode` = b.`boardCode`
                AND a.`topCategoryCode` = b.`topCategoryCode`
                AND b.`bookmarkActionUserCode` = $query_user_code";
            }
            $this->query .= " left join lubyconuser.`userbasic` c
            ON a.`userCode` = c.`userCode`
            
            $this->where_query
            $this->order_query
            limit $this->call_page,$this->page_boundary";
        }
        //echo $this->query;
    }

    /*
    public function count_page($db_result) // count all page function
    {
        $foundRow_result = mysqli_fetch_array($db_result); //row count
        $this->all_page_count = ceil($foundRow_result[0] / 30); //all page count
    }

    public function spread_contents($contents_result,$one_depth,$ajax_boolean)
    {
        if($contents_result->num_rows != 0)
        {
            //echo "<div class='scroll_checker page_top_$page_param'></div>";
            $i = 1;
            while( $row = mysqli_fetch_array($contents_result) )
            {
                $this->json_decode('top_category',"../../../../data/top_category.json");
                $country_decode = $this->json_decode_code;
                $this->json_decode('ccCode',"../../../../data/ccCode.json");
                $ccCode_decode = $this->json_decode_code;
                $top_category = $country_decode[$row['topCategoryCode']]['name'];
                include('../../../component/view/contents_card/content_card.php');

                //page load
                if($i == $this->page_limit && !$ajax_boolean)
                {
                    echo "<div class='scroll_checker page_bottom_$this->start_page'></div>";
                    $i = 1;
                    $this->start_page++;
                }else
                {
                    $i++;
                }
                //page load
            }   
            //ajax
            if($ajax_boolean)
            {
                echo "<div class='scroll_checker page_bottom_$this->target_page'></div>";
            }
            //ajax

            if($this->all_page_count == $this->target_page){
                echo '<div class="finish_contents" data-value="content"></div>';
            }

        }else{
            include_once("../../../service/view/nullMessage.php");
        }
    }

    public function check_cookie()
    {
        if( isset($_COOKIE['contents_history']))
        {
            //print_r( $_COOKIE['contents_history']);
            $cookie_string = $_COOKIE['contents_history'];
            parse_str ($cookie_string , $cookie_parse );
            $cookie_contents_number = $cookie_parse['concate'].'_'.$cookie_parse['conno'];

            if( $this->top_category == $cookie_parse['cate'] && $this->now_page == $cookie_parse['page'])
            {
                echo "<script>scroll_from_cookie('$cookie_contents_number');console.log(1)</script>"; //find pre click contents
            }else
            {
                echo "<script>scroll_from_param('$this->now_page');</script>"; //find pre click contents
            }
        }else
        {
            echo "<script>scroll_from_param('private $now_page');</script>"; //find pre click contents
        }
    }
    */
}
?>