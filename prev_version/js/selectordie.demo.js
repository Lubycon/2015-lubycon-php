/* ===========================================================
 *
 *  Name:          global.js
 *  Updated:       2014-04-15
 *  What?:         Random crap for the Select or Die demo
 *
 *  Oddny | Cogs 'n Kegs
 * =========================================================== */


function random_word() {
    var $words      = ['Frightened', 'By', 'Your', 'Own', 'Smell', 'Bitterness', 'Will', 'Run', 'You', 'Through']; // In FLames - Bullet Ride (http://www.youtube.com/watch?v=lDwqzGtjGMU)
    var $randomizer = $words[Math.floor(Math.random() * $words.length)];
    return $randomizer;
}

jQuery(document).ready(function ($) {
    $(".basic").selectOrDie();

    $(".basic_filter").selectOrDie({
        customClass: "custom",
        customID: "custom",
        size: 5
    });

    $(".callback").selectOrDie({
        onChange: function() {
            alert($(this).val());
        }
    });

    $(".trigger").click(function(){
        var $method       = $(this).data("method").replace(/'/g, '"'),
            $subMethod    = $(this).data("sub-method"),
            $parent       = $(this).closest("section"),
            $parentID     = $parent.prop("id"),
            $parentSelect = $parent.find("select"),
            $preMethod;

            $("span", this).toggle();
            $("#" + $parentID + " pre").litelighter('enable');
    });

    /* - - - 
    $("a:not(.external)").click(function(){
        var $target   = $(this).attr("href"),
            $position = $($target).position().top - 40 + "px";
        $("html, body").animate({scrollTop: $position}, 500);
    });

    $("pre").litelighter({
        style: 'light',
        language: 'js'
    });
    */

});
