SELECT 
    f.fee_id,
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    f.amount,
    f.date_issued,
    fs.name AS fee_status
FROM 
    fee f
JOIN 
    user u ON f.user_id = u.user_id
JOIN 
    fee_status fs ON f.fee_status_id = fs.fee_status_id
ORDER BY 
    fs.name ASC, f.date_issued DESC;