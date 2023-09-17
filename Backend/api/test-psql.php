<?php
/*POSTGRES_URL="postgres://default:M6ATnI3RfgVt@ep-raspy-bar-37176471-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:M6ATnI3RfgVt@ep-raspy-bar-37176471-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:M6ATnI3RfgVt@ep-raspy-bar-37176471.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-raspy-bar-37176471-pooler.ap-southeast-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="M6ATnI3RfgVt"
POSTGRES_DATABASE="verceldb"*/
$username = "default";
$password = "M6ATnI3RfgVt";
if (!extension_loaded('pdo')) {
    die('The PDO extension is not loaded');
}



// Connect to the PostgreSQL database
//$db_connection = odbc_connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server=ep-raspy-bar-37176471-pooler.ap-southeast-1.postgres.vercel-storage.com;Database=verceldb;Port=5432;String Types=Unicode', $user, $password);

// Create a new PDO object
$db_connection = new PDO('odbc:DRIVER={Devart ODBC Driver for PostgreSQL};Server=ep-raspy-bar-37176471-pooler.ap-southeast-1.postgres.vercel-storage.com;Database=verceldb;Port=5432;String Types=Unicode', $user, $password);

// Check if the connection was successful
if (!$db_connection) {
    die('Could not connect to the database');
}
echo "yeahh";

// Close the database connection
$db_connection = null;

?>