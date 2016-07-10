<?PHP
include_once($_SERVER['DOCUMENT_ROOT']."/logger/KLogger.php");
 
function LOGDEBUG($str)
{
        $log = new KLogger(getLogFileName(), KLogger::DEBUG);
        $log->LogDebug($str);
}
 
 
function LOGINFO($str)
{
        $log = new KLogger(getLogFileName(), KLogger::DEBUG);
        $log->LogInfo($str);
}
 
 
function LOGWARN($str)
{
        $log = new KLogger(getLogFileName(), KLogger::DEBUG);
        $log->LogWarn($str);
}
 
 
function LOGERROR($str)
{
        $log = new KLogger(getLogFileName(), KLogger::DEBUG);
        $log->LogError($str);
}
 
 
function getCurrentDate()
{
        $current_date = date("Y-m-d");
        return $current_date; 
}
 
function getLogFileName()
{
        $log_file = $_SERVER['DOCUMENT_ROOT'].'/log/log-'.getCurrentDate().'.txt';
        return $log_file;
}
?>