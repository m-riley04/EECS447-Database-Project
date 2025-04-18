SELECT 
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    SUM(f.amount) AS total_unpaid_fines
FROM 
    fee f
JOIN 
    user u ON f.user_id = u.user_id
JOIN 
    fee_status fs ON f.fee_status_id = fs.fee_status_id
WHERE 
    fs.name = 'Unpaid'
GROUP BY 
    u.user_id, full_name
ORDER BY 
    total_unpaid_fines DESC;