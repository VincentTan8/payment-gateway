<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// // Handle CORS preflight (OPTIONS) requests
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: http://localhost");
//     header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//     header("Access-Control-Allow-Headers: Content-Type, Authorization");
//     header("Access-Control-Allow-Credentials: true");
//     http_response_code(204);
//     exit();
// }

// header("Access-Control-Allow-Origin: http://localhost");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawData = file_get_contents('php://input'); // Raw JSON payload
    $decodedData = json_decode($rawData, true); // Decode JSON

    try {
        // Send POST request using cURL
        $ch = curl_init('https://pg-sandbox.paymaya.com/checkout/v1/checkouts');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'accept: application/json',
            'content-Type: application/json',
            'authorization: Basic cGstWjBPU3pMdkljT0kyVUl2RGhkVEdWVmZSU1NlaUdTdG5jZXF3VUU3bjBBaDo='
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($decodedData['data']));

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Handle the response
        $result = json_decode($response, true);
        if ($httpCode === 200) {
            echo json_encode(['redirectUrl' => $result['redirectUrl']]);
            exit();
        } else {
            echo json_encode([
                'error' => $result['message'],
                'field' => $result['parameters'][0]['field'] ?? '',
                'description' => $result['parameters'][0]['description'] ?? ''
            ]);
            exit();
        }

    } catch (Exception $error) {
        echo 'Error: ' . $error->getMessage();
    }
    $result = 'Done!';
    echo json_encode(['result' => $result]);
}
?>