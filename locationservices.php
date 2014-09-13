<?
//$html = file_get_contents('http://www.where-am-i.net/');
$c = curl_init('http://www.where-am-i.net/');
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($c);

if (curl_error($c))
    die(curl_error($c));

// Get the status code
$status = curl_getinfo($c, CURLINFO_HTTP_CODE);

curl_close($c);

?>