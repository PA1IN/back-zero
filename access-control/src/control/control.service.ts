import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient, gql } from 'graphql-request';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessControlService {
  private authUser: GraphQLClient;
  private authDevice: GraphQLClient;
  private riskAnalysis: GraphQLClient;

  constructor(private readonly cfg: ConfigService) {
    this.authUser = new GraphQLClient(
      cfg.get('AUTH_USER_URL', 'http://192.168.1.2:3002/graphql'),
    );
    this.authDevice = new GraphQLClient(
      cfg.get('AUTH_DEVICE_URL', 'http://192.168.1.4:3004/graphql'),
    );

    this.riskAnalysis = new GraphQLClient(
      cfg.get('RISK_ANALYSIS_URL', 'http://192.168.1.6:3006/graphql'),
    );
  }

   async enviarRiesgo(data: {
    userId: number;
    ip: string;
    navigator: string;
    operatingSystem: string;
    timeZone: string;
    email: string;
    deviceId: string;
  }): Promise<void> {
    const mutation = gql`
      mutation RegistrarRiesgo($input: RiskInput!) {
        analyzeAccessRisk(input: $input)
      }
    `;

    try {
      const respuesta = await this.riskAnalysis.request<{
        analyzeAccessRisk: string;
      }>(mutation, {
        input: data,
      });
      console.log('riesgo registrado: ', respuesta.analyzeAccessRisk);
    } catch (error) {
      console.log('error al enviar el riesgo: ', error);
    }
  }

  async verify(token: string, deviceId: string): Promise<boolean> {
    //query pa user
    const queryUser = gql`
      query ($token: String!) {
        validateToken(token: $token) {
          ok
          userId
        }
      }
    `;

    const { validateToken } = await this.authUser.request<{
      validateToken: { ok: boolean; userId: number | null };
    }>(queryUser, { token });

    if (!validateToken.ok || !validateToken.userId) {
      return false;
    }

    //query pa device
    const queryDevice = gql`
      query ($token: String!, $deviceId: String!, $userId: Float!) {
        verifyDevice(token: $token, deviceId: $deviceId, userId: $userId)
      }
    `;

    const secret = 'supersecreto123';
    console.log('token enviado --->', token);
    const decodedToken = jwt.verify(token, secret) as any;
    const payload = {
      deviceId: decodedToken.deviceId,
      userId: decodedToken.userId,
    };

    console.log('*******', payload);

    const { verifyDevice } = await this.authDevice.request<{
      verifyDevice: boolean;
    }>(queryDevice, {
      token,
      deviceId,
      userId: validateToken.userId,
    });


    if(validateToken.ok && verifyDevice)
    {
        await this.enviarRiesgo({
            userId: validateToken.userId,
            ip: decodedToken.ip || '0.0.0.0',
            navigator: decodedToken.navigator || 'unknown',
            operatingSystem: decodedToken.operatingSystem || 'unknown',
            timeZone: decodedToken.timeZone || 'America/Santiago',
            email: decodedToken.email || 'desconocido',
            deviceId: decodedToken.deviceId, 
        })
    }

    return validateToken.ok && verifyDevice;
  }

 
}
