import {AuthConfig} from "angular-oauth2-oidc";
import {Environment} from "./environment.model";

// Helper to resolve runtime environment variables injected into window.__env
const getEnv = (key: string, defaultValue: string = ""): string => {
  const win = typeof window !== "undefined" ? (window as any) : {};
  if (win.__env && win.__env[key] !== undefined && win.__env[key] !== "") {
    return win.__env[key];
  }
  return defaultValue;
};

const issuer = getEnv("OIDC_ISSUER", "http://localhost:9091");
const clientId = getEnv("OIDC_CLIENT_ID", "netzgrafikeditor");
const scope = getEnv("OIDC_SCOPE", "openid profile email groups offline_access");
const redirectUri = getEnv("OIDC_REDIRECT_URI", "");
const requireHttps = getEnv("OIDC_REQUIRE_HTTPS", "false") === "true";
const disableBackend = getEnv("DISABLE_BACKEND", "false") === "true";
const backendUrl = getEnv("BACKEND_URL", "http://localhost:8080");

const authConfig: AuthConfig = {
  issuer,
  clientId,
  redirectUri: redirectUri || (typeof location !== "undefined" ? location.origin : ""),
  postLogoutRedirectUri: redirectUri || (typeof location !== "undefined" ? location.origin : ""),
  responseType: "code",
  scope,
  requireHttps,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: getEnv("OIDC_DEBUG", "false") === "true",
};

export const environment: Environment = {
  production: true,
  label: getEnv("APP_LABEL", "Authelia"),
  backendUrl,
  authConfig,
  disableBackend,
  customElement: false,
  standalonedemo: false,
};
