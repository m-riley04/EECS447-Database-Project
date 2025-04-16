export default interface UserModel {
    user_id: number;
    membership_type_id: number;
    account_status_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_staff: boolean;
};