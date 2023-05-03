type GameProfile = {
    riot: string,
    battlenet: string,
    steam: string
}

type User = {
    balance: number,
    birthdate: string,
    blocked: boolean,
    confirmed: boolean,
    country: string,
    createdAt: string,
    email: string,
    gameProfile: GameProfile | null,
    gender: string,
    fullName: string,
    id: number,
    level: number,
    mainTeam: string,
    payments: [],
    provider: string,
    teams: [],
    updatedAt: string,
    username: string
}

export type { User, GameProfile, }