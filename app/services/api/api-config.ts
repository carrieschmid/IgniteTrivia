import * as env from "../../utils/environment-variables"
// import { API_URL } from "react-native-dotenv"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: env.API || "https://opentdb.com/api.php?amount=12",
  timeout: 10000,
}
