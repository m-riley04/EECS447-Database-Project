SELECT 
    u.user_id, 
    u.first_name, 
    u.last_name, 
    COUNT(t.transaction_id) AS total_checkouts
FROM t_user u
JOIN t_transaction t ON u.user_id = t.user_id
GROUP BY u.user_id, u.first_name, u.last_name
ORDER BY total_checkouts DESC;
