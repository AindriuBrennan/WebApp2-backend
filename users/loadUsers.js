import userModel from '.../users/userModel'

const users = [
    {
        'email': 'test@mail.com',
        'password': '12345'
   },
];

export default async function loadUsers() {
    console.log('load user Data');
    try {
      new  userModel(users[0]).save();
      console.info(`${users.length} users were successfully stored`);
    } catch(err) {
        console.error(`failed to Load User data:${err}`);
    }
}