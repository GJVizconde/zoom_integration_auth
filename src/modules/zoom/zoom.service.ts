import axios from 'axios'
import { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } from '../../config/env.config'
import base64 from 'base-64'
import { serviceHandlerError } from '../../utils/handlerErrors'

export const getAccessTokenFromZoom = async () => {
  try {
    const url = 'https://zoom.us/oauth/token'

    const username = ZOOM_CLIENT_ID
    const password = ZOOM_CLIENT_SECRET

    const queryParams = {
      grant_type: 'account_credentials',
      account_id: ZOOM_ACCOUNT_ID
    }

    const authHeader = 'Basic ' + base64.encode(username + ':' + password)

    const axiosConfig = {
      params: queryParams,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      }
    }

    const data = await axios.post(url, null, axiosConfig)
    return data.data
  } catch (error) {
    serviceHandlerError(error, 'An error ocurred creating Access Token')
  }
}

export const getUserDataFromZoom = async (email: string) => {
  const getUserUrl = `https://api.zoom.us/v2/users/${email}`

  try {
    const access_token = (await getAccessTokenFromZoom()).access_token

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    }

    const userData = (await axios.get(getUserUrl, axiosConfig)).data

    return userData
  } catch (error) {
    serviceHandlerError(error, 'An error occurred retrieving user data.')
    return error
  }
}
