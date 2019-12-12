import UserModel from './users/userModel';

const users = [
    {
        'email': 'secondTest@mail.com',
        'password': '12345'
   },
   {
       'email': "andrew-brennan@mail.com",
       'password': '54321'
   },
   {
       'email':"testing@mail.com",
       'password':'hello'
   }
];


export default async function loadUsers() {
    console.log('load user Data');
    try {
        // await userModel.deleteMany();
        new UserModel(users[0]).save();
        new UserModel(users[1]).save();
        new UserModel(users[2]).save();
        console.info(`${users.length} users were created successfully and stored in DB`);
    }catch(err){
        console.error(`failed to load user data${err}`);
    }
}

