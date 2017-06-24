<?php

$final =[];
function query($url) {
	// setup curl options
	$options = array(
		CURLOPT_URL => $url,
		CURLOPT_HEADER => false,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_RETURNTRANSFER => true
		);

    // perform request
	$cUrl = curl_init();
	curl_setopt_array( $cUrl, $options );
	$response = curl_exec( $cUrl );
	curl_close( $cUrl );

    // decode the response into an array
	$decoded = json_decode( $response, true );

	return $decoded;
}
if ($_SERVER['REQUEST_URI']) {
	
	$route = $_SERVER['REQUEST_URI'];
 echo $route; 
	$singleContent ='/dist/singleContent/';
	$singleEvent ='/dist/singleEvent/';
	$profile ='/dist/profile/';

	if (substr($route, 0, strlen($singleContent)) === $singleContent) {
		echo "content";
		$contentUrl = 'https://campusbox.org/dist/api/public/content/';
		$contentId = substr($route, 20); 

		$finalUrl = $contentUrl . $contentId;
		$decoded = query($finalUrl);

		$final["all"] =$decoded['data'];
		$final["title"] =$decoded['data']['title'];
		$final["description"] =$decoded['data']['Items']['data'][0]['description'];
	}

	elseif (substr($route, 0, strlen($profile)) === $profile) {
		echo "profile";
		$contentUrl = 'https://campusbox.org/dist/api/public/student/';
		$contentId = substr($route, 14); 
		$finalUrl = $contentUrl . $contentId;
		echo $finalUrl;
		$decoded = query($finalUrl);
		print_r($decoded);
		$final["all"] =$decoded['data'];
		
		$final["title"] =$decoded['data']['name'];
		$final["description"] =$decoded['data']['subtitle'];
	} 

	elseif (substr($route, 0, strlen($singleEvent)) === $singleEvent) {
	// elseif (false){
		echo "event";
		$contentUrl = 'https://campusbox.org/dist/api/public/event/';
		$contentId = substr($route, 18); 
		$finalUrl = $contentUrl . $contentId;
		// echo $finalUrl;
		$decoded = query($finalUrl);
		//print_r ($decoded);
		$final["all"] =$decoded['data'];
		
		$final["title"] =$decoded['data'][0]['title'];
		$final["description"] =$decoded['data'][0]['subtitle'];

	}
?>	
	<title><?php print_r($final['title']) ?></title>
	<meta property="og:title" content="<?php print_r($final["title"]); ?>" />
	<meta property="og:description" content="<?php echo $final["description"]; ?>" />
	<meta property="fb:app_id" content="1250377088376164" />
 	<meta property="og:type"   content="website" />
<?php }
?>