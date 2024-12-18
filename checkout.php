<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['data'];

    // Prepare data to send
    $dataSend = [
        'totalAmount' => [
            'value' => $totalPay,
            'currency' => $payCurrency
        ],
        'redirectUrl' => [
            'success' => 'http://localhost/payment-gateway/success.php',
            'failure' => 'http://localhost/payment-gateway/failed.php',
            'cancel' => 'http://localhost/payment-gateway/cancelled.php'
        ],
        'requestReferenceNumber' => '5fc10b93-bdbd-4f31-b31d-4575a3785009',
        'buyer' => [
            'contact' => ['email' => 'vincent@gmail.com'],
            'firstName' => 'vincent',
            'middleName' => 'd',
            'lastName' => 'tan',
            'birthday' => '1994-01-30',
            'sex' => 'M',
        ],
        'items' => $itemData,
    ];

    try {
        // Send POST request using cURL
        $ch = curl_init('https://pg-sandbox.paymaya.com/checkout/v1/checkouts');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: Basic cGstWjBPU3pMdkljT0kyVUl2RGhkVEdWVmZSU1NlaUdTdG5jZXF3VUU3bjBBaDo='
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dataSend));

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // Handle the response
        $result = json_decode($response, true);
        if ($httpCode === 200) {
            header("Location: " . $result['redirectUrl']);
            exit();
        } else {
            echo $result['message'] . ": " .
                $result['parameters'][0]['field'] . " - " .
                $result['parameters'][0]['description'];
        }

    } catch (Exception $error) {
        echo 'Error: ' . $error->getMessage();
    }
    $result = 'Done!';
    echo json_encode(['result' => $result]);
}
?>