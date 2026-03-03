<?php
$bkash_number = "017XXXXXXXX"; // আপনার বিকাশ নাম্বার এখানে দিন
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>অর্ডার কনফার্ম করুন</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <div class="notice-board" style="border-color: #f59e0b;">
        <h3 style="color: #f59e0b;">পেমেন্ট ইন্সট্রাকশন</h3>
        <p>বিকাশ পার্সোনাল নাম্বারে টাকা <b>Send Money</b> করুন।</p>
        <p>নাম্বার: <b><?php echo $bkash_number; ?></b></p>
    </div>

    <div class="service-card" style="padding: 20px;">
        <form action="success.php" method="POST">
            <div class="form-group">
                <label>আপনার নাম</label>
                <input type="text" name="name" placeholder="Name লিখুন" required>
            </div>
            <div class="form-group">
                <label>NID বা ফোন নাম্বার (যেটির কাজ করাবেন)</label>
                <input type="text" name="target_info" placeholder="তথ্যটি দিন" required>
            </div>
            <div class="form-group">
                <label>বিকাশ ট্রানজেকশন আইডি (TrxID)</label>
                <input type="text" name="trxid" placeholder="8NHD76..." required>
            </div>
            <button type="submit" class="btn-submit">অর্ডার সাবমিট করুন</button>
        </form>
    </div>
</div>

</body>
</html>