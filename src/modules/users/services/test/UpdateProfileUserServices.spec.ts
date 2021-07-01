import User from "@modules/users/infra/typeorm/entities/User";
import FakeBCryptHashPassword from "@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";

import AppError from "@shared/errors/AppError";

import UpdateProfileUserServices from "./UpdateProfileUserServices";

let fakeUsersRepository: FakeUsersRepository;

let fakeBCryptHashPassword: FakeBCryptHashPassword;

let uploadProfileUserServices: UpdateProfileUserServices;

let user: User;

const name = "Fakes";

const email = "Fakes@Fakes.com";

let password: string;

describe("UploadProfileUserServices", () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeBCryptHashPassword = new FakeBCryptHashPassword();

    password = await fakeBCryptHashPassword.HashCrete("Fakes1213");

    uploadProfileUserServices = new UpdateProfileUserServices(
      fakeUsersRepository,

      fakeBCryptHashPassword
    );

    await fakeUsersRepository.create({
      name: "Outro Fulano",

      email: "Fulano@Fakes.com",

      password: await fakeBCryptHashPassword.HashCrete("Outro1213"),
    });

    user = await fakeUsersRepository.create({
      name,

      email,

      password,
    });
  });

  it("should not be able to update a user not exist", async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: "123",

        name,

        email,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a user with email existed", async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,

        name,

        email: "Fulano@Fakes.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update password if the password old not is equal", async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,

        name,

        email,

        password: "newPass",

        oldpassword: "pass-erro",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update password if the password old empty", async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,

        name,

        email,

        password: "Fulano123",

        // oldpassword: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update a user created", async () => {
    const userUpdated = await uploadProfileUserServices.execute({
      user_id: user.id,

      name: "Fulano de Tau",

      email: "FulanoTau@Fakes.com",

      password: "Fulano@123",

      oldpassword: user.password,
    });

    expect(userUpdated.name).toBe("Fulano de Tau");

    expect(userUpdated.email).toBe("FulanoTau@Fakes.com");

    expect(userUpdated.password).toBe("Fulano@123");
  });
});
