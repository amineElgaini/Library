/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_books_info` AS select `copies`.`book_id` AS `bookId`,`books`.`title` AS `title`,`books`.`ISBN` AS `isbn`,`books`.`genre` AS `genre`,`books`.`number_of_copies` AS `numberOfCopies`,cast(sum(`copies`.`availability_status`) as signed) AS `availableBooks` from (`books` join `copies` on(`books`.`id` = `copies`.`book_id`)) group by `books`.`id`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_get_last_borrow_for_last_7_days` AS select cast(`borrowing_records`.`borrowing_date` as date) AS `borrowing_date`,count(0) AS `borrows` from ((`borrowing_records` join `copies` on(`borrowing_records`.`copy_id` = `copies`.`id`)) join `books` on(`books`.`id` = `copies`.`book_id`)) where `borrowing_records`.`borrowing_date` between curdate() - interval 6 day and curdate() + interval 1 day group by cast(`borrowing_records`.`borrowing_date` as date) order by `borrowing_records`.`borrowing_date` limit 7;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_get_last_seven_days` AS select curdate() + interval 1 day - interval `numbers`.`number` day AS `date` from (select 1 AS `number` union select 2 AS `2` union select 3 AS `3` union select 4 AS `4` union select 5 AS `5` union select 6 AS `6` union select 7 AS `7`) `numbers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_more_user_info` AS select `users`.`id` AS `id`,`users`.`username` AS `username`,`users`.`email` AS `email`,`HowManyBorrowedBooks`(`users`.`id`) AS `how_many_borrowed_books`,`HowManyStillBorrowedBooks`(`users`.`id`) AS `how_many_still_borrowed_books` from `users`;

CREATE DEFINER=`root`@`localhost` FUNCTION `anAvailableCopy`(book_id_value int) RETURNS int(11)
BEGIN
	
	return (select copies.id from books inner join copies on books.id = copies.book_id where books.id = book_id_value and availability_status = 1 limit 1);
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrow`(IN user_id_value int, IN book_id_value int, IN borrowing_days_value int)
BEGIN
  	DECLARE copy_id_value int;
  	DECLARE error_message VARCHAR(255) DEFAULT 'An Error';
  	DECLARE borrowingTime TIMESTAMP DEFAULT now();
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
  	BEGIN
    	ROLLBACK;
    	SELECT error_message as error;
  	END;
  	
	START TRANSACTION;
	
	IF (!userExist(user_id_value)) THEN
		SET error_message = 'User Not Found';
		SIGNAL SQLSTATE '45000';
	END IF;
	
	set copy_id_value = anAvailableCopy(book_id_value);
	
	IF (ISNULL(copy_id_value)) THEN
		SET error_message = 'No Availble Copies';
		SIGNAL SQLSTATE '45000';
	END IF;
	
	
	update copies set availability_status = 0 where id = copy_id_value;
	
	insert into borrowing_records(user_id, copy_id, borrowing_date, due_date, created_at, updated_at)
	values(user_id_value, copy_id_value, now(), DATE_ADD(now(), INTERVAL borrowing_days_value DAY),borrowingTime,borrowingTime);
	
	commit;
	select 'success';

END;

CREATE DEFINER=`root`@`localhost` FUNCTION `HowManyBorrowedBooks`(user_id_value int) RETURNS int(11)
BEGIN
	
	return (select count(*) from borrowing_records where user_id = user_id_value);
END;

CREATE DEFINER=`root`@`localhost` FUNCTION `HowManyStillBorrowedBooks`(user_id_value int) RETURNS int(11)
BEGIN
	
	return (select count(*) from borrowing_records where user_id = user_id_value and actual_return_date IS NULL);
END;

CREATE DEFINER=`root`@`localhost` FUNCTION `isBorrowedBookIsNotReturned`(borrowing_record_id_value int) RETURNS tinyint(1)
BEGIN
	DECLARE res BOOLEAN DEFAULT 0;
	
	select 1 into res FROM borrowing_records where id = borrowing_record_id_value AND actual_return_date IS NULL;
		
	return res;
	END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `returnBook`(IN borrowing_record_id_value int)
BEGIN

	DECLARE user_id_value, copy_id_value, number_of_late_days_value , fine_amount_value INT;
   DECLARE return_date_value TIMESTAMP;
    DECLARE error_message VARCHAR(255) DEFAULT 'An Error';
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
  	BEGIN
    	ROLLBACK;
    	select error_message as error;
  	END;
  	START TRANSACTION;

	SET return_date_value = now();
	
	IF (isBorrowedBookIsNotReturned(borrowing_record_id_value)) THEN

        UPDATE borrowing_records SET actual_return_date = return_date_value where id = borrowing_record_id_value;

		SELECT
        	user_id, copy_id, DATEDIFF(actual_return_date, due_date), (DATEDIFF(actual_return_date, borrowing_date) + 1) * (SELECT default_fine_per_day FROM settings_table limit 1)
        into
        	user_id_value, copy_id_value, number_of_late_days_value, fine_amount_value
        FROM
        	borrowing_records
        WHERE 
        	id = borrowing_record_id_value;
        	
		UPDATE copies set availability_status = 1 WHERE id = copy_id_value;

        INSERT INTO fines(user_id, borrowing_record_id, number_of_late_days, fine_amount, payment_status, created_at, updated_at) VALUES(user_id_value, borrowing_record_id_value, number_of_late_days_value, fine_amount_value, 0, return_date_value, return_date_value);

        COMMIT;
        select 'success';
    ELSE
    	SET error_message = 'Book Already Returned';
		SIGNAL SQLSTATE '45000';
	END IF;
END;

CREATE DEFINER=`root`@`localhost` FUNCTION `userExist`(user_id_value int) RETURNS int(11)
BEGIN
	declare res BOOLEAN DEFAULT FALSE;
	select 1 into res from users where id = user_id_value ;
		
	return res;
END;














/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;