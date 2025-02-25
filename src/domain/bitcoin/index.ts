import { InvalidSatoshiAmount, InvalidTargetConfirmations } from "@domain/errors"

export const SATS_PER_BTC = 10 ** 8

export const btc2sat = (btc: number) => {
  return Math.round(btc * SATS_PER_BTC) as Satoshis
}

export const sat2btc = (sat: number) => {
  return sat / SATS_PER_BTC
}

export const toSats = (amount: number): Satoshis => {
  return amount as Satoshis
}

export const toTargetConfs = (confs: number): TargetConfirmations => {
  return confs as TargetConfirmations
}

export const toMilliSatsFromNumber = (amount: number): MilliSatoshis => {
  return amount as MilliSatoshis
}

export const toMilliSatsFromString = (amount: string): MilliSatoshis => {
  return parseInt(amount, 10) as MilliSatoshis
}

export const checkedToSats = (amount: number): Satoshis | ValidationError => {
  if (!(amount && amount > 0)) return new InvalidSatoshiAmount()
  return toSats(amount)
}

export const checkedToTargetConfs = (
  confs: number,
): TargetConfirmations | ValidationError => {
  if (!(confs && confs > 0)) return new InvalidTargetConfirmations()
  return toTargetConfs(confs)
}

// Check for hexadecimal (case insensitive) 64-char SHA-256 hash
export const isSha256Hash = (value: string): boolean => !!value.match(/^[a-f0-9]{64}$/i)

export const BtcNetwork = {
  mainnet: "mainnet",
  testnet: "testnet",
  regtest: "regtest",
} as const

export const FEECAP_PERCENT = 0.02
export const FEEMIN = toSats(10) // sats
