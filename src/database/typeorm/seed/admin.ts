import BCryptHashPassword from '../../../modules/users/providers/HashPassword/implements/BCryptHashPassword';
import User from '../../../modules/users/typeorm/entities/User';
import CrateConnection from '../index';

async function create() {
  const crateConnection = await CrateConnection('localhost');
  const ormRepository = crateConnection.getRepository(User);
  const hashPassword = new BCryptHashPassword();

  const data = {
    name: 'admin',
    username: 'admin',
    email: `admin@rentals.com`,
    password: await hashPassword.HashCrete('admin'),
    driver_license: 'A',
    admin: true,
  };

  let user = await ormRepository.findOne({
    where: { username: data.username.toLowerCase() },
  });

  if (!user) {
    user = ormRepository.create(data);
    await ormRepository.save(user);
  }

  crateConnection.close();
  return user;
}

create().then(adm => console.log('User admin crated successfully', adm));
