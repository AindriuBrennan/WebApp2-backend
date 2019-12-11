import userModel from '.../users/userModel'

const users = [
    {
        'email': 'test@mail.com',
        'password': '12345'
   },
   {
       'email': "andrew-brennan@mail.com",
       'password': '54321'
   }
];


export default async function loadUsers() {
    try {
        await userModel.deleteMany();
        new userModel(users[0]).save();
        new userModel(users[1]).save();
        console.info(`${users.length} users were created successfully and stored in DB`);
    }catch(err){
        console.error(`failed to load user data${err}`);
    }
}

// export default async function loadUsers() {
//     console.log('load user Data');
//     try {
//       new  userModel(users[0]).save();
//       console.info(`${users.length} users were successfully stored`);
//     } catch(err) {
//         console.error(`failed to Load User data:${err}`);
//     }
// }