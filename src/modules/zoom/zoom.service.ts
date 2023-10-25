import axios from 'axios'
import {
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
  ZOOM_OWNER_EMAIL
} from '../../config/env.config'
import base64 from 'base-64'
import { serviceHandlerError } from '../../utils/handlerErrors'
import { CreateMeetingDTO, CreateMeetingSignatureDTO } from './dto/zoom'
import KJUR from 'jsrsasign'

interface UserData {
  userDataId: string
  access_token: string
}

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

export const getUserDataFromZoom = async (
  email: string | undefined
): Promise<UserData | undefined> => {
  const getUserUrl = `https://api.zoom.us/v2/users/${email}`

  try {
    const access_token = (await getAccessTokenFromZoom()).access_token

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    }

    const userDataId = (await axios.get(getUserUrl, axiosConfig)).data.id

    return {
      userDataId: userDataId,
      access_token: access_token
    }
  } catch (error) {
    serviceHandlerError(error, 'An error occurred retrieving user data.')
    return undefined // Devuelve undefined en caso de error
  }
}

export const meetingFromZoom = async ({ subject, description, start_time }: CreateMeetingDTO) => {
  const userData = await getUserDataFromZoom(ZOOM_OWNER_EMAIL)
  const userId = userData?.userDataId
  const access_token = userData?.access_token

  const dataMeeting = {
    topic: subject,
    type: 2,
    start_time: start_time,
    duration: 60,
    timezone: 'America/Los_Angeles',
    password: '123',
    agenda: description,
    settings: {
      host_video: false,
      participant_video: false,
      jbh_time: 5, //Permite al participante unirse 5 minutos antes de la hora de inicio
      join_before_host: false,
      mute_upon_entry: true,
      breakout_room: {
        enable: false
      }
    }
  }

  const createMeetingZoomUrl = `https://api.zoom.us/v2/users/${userId}/meetings`

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  }

  const newMeeting = (await axios.post(createMeetingZoomUrl, dataMeeting, axiosConfig)).data

  return newMeeting
}

export const createMeetingAuth = ({ meetingNumber, role }: CreateMeetingSignatureDTO) => {
  try {
    const iat = Math.round(new Date().getTime() / 1000) - 30
    const exp = iat + 60 * 60 * 2

    const oHeader = { alg: 'HS256', typ: 'JWT' }

    console.log(process.env.ZOOM_MEETING_SDK_KEY)

    const oPayload = {
      sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: process.env.ZOOM_MEETING_SDK_KEY,
      tokenExp: iat + 60 * 60 * 2
    }

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    // @ts-ignore
    const signature = KJUR.jws.JWS.sign(
      'HS256',
      sHeader,
      sPayload,
      process.env.ZOOM_MEETING_SDK_SECRET
    )

    return signature
  } catch (error) {
    serviceHandlerError(error, 'An error occurred retrieving meeting signature.')
  }
}
