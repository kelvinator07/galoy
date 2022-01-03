import { usernameAvailable } from "@app/accounts"
import { UsernameIsImmutableError, UsernameNotAvailableError } from "@domain/accounts"
import { checkedToUsername } from "@domain/users"
import { AccountsRepository } from "@services/mongoose"

export const setUsername = async ({
  id,
  username,
}: {
  id: string
  username: string
}) => {
  const checkedUsername = checkedToUsername(username)
  if (checkedUsername instanceof Error) return checkedUsername

  const accountsRepo = AccountsRepository()
  const account = await accountsRepo.findById(id as AccountId)
  if (account instanceof Error) return account

  if (account.username !== undefined) return new UsernameIsImmutableError()

  const isAvailable = await usernameAvailable(checkedUsername)
  if (isAvailable instanceof Error) return isAvailable
  if (!isAvailable) return new UsernameNotAvailableError()

  account.username = checkedUsername
  return accountsRepo.update(account)
}
