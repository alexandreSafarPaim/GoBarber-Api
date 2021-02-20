import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  it('should be able update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const fakeHashProvider = new FakeHashProvider()
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatarFile.jpg',
    })

    expect(user.avatar).toEqual('avatarFile.jpg')
  })

  it('should be delete old avatar when update new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const fakeHashProvider = new FakeHashProvider()
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatarFile.jpg',
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'newAvatar.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatarFile.jpg')

    expect(user.avatar).toEqual('newAvatar.jpg')
  })

  it('should not be able to update avatar if user not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatarService.execute({
        user_id: 'not-existis-is',
        avatarFilename: 'avatarFile.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
