//const TIMEOUT_FOR_PAYMENT_IN_MS: number = 7500

export enum ChargeStatusType {
  Successful = 'successful',
  Redirect = 'redirect',
  failure = 'failure'
}

export interface ChargeResponse {
  status: ChargeResponse
  redirectUrl?: string
  message?: string
}

export interface PaymentMethod {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly needsInteractionOnNewCharges: boolean

  readonly urlForSuccess: string
  readonly urlForFailure: string

  charge(
    amountInCents: number,
    chargeName: string,
    chargeDescription: string,
    data: any
  ): Promise<ChargeResponse>

  successfulCharge(req: any, res: any): void
  failedCharge(req: any, res: any): void
}
