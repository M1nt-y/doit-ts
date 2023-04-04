export enum AppLayoutsEnum {
    default = "default",
    login = "login"
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
    default: "DefaultLayout.vue",
    login: "LoginLayout.vue"
};
