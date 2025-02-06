<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = fopen('upload.txt', 'w');
    $input = fopen('php://input', 'r');

    while ($data = fread($input, 1024)) {
        fwrite($file, $data);
    }

    fclose($file);
    fclose($input);

    http_response_code(200);
    echo "Upload realizado com sucesso!";
} else {
    http_response_code(405);
    echo "Método não permitido";
}
