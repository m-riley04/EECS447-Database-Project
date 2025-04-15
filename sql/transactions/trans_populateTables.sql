START TRANSACTION;

CALL spPopulateAuthorTable();
CALL spPopulateGenreTable();
CALL spPopulateMediaTypeTable();
CALL spPopulateFeeStatusTable();
CALL spPopulateMembershipTypeTable();
CALL spPopulateAccountStatusTable();
CALL spPopulateMediaItemTable();
CALL spPopulateUserTable();
CALL spPopulateFeeTable();
CALL spPopulateTransactionTable();

COMMIT;